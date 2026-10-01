#!/usr/bin/env bash
# Bundled-MySQL backup. Remaining arguments are passed to docker compose unchanged.
set -euo pipefail
umask 077
if [[ $# -lt 2 ]]; then
  echo 'Usage: bash backup.sh BACKUP_DIRECTORY --env-file .env -f compose.yaml -f compose.mysql.yaml [-f compose.metrics.yaml]' >&2
  exit 2
fi
destination=$1
shift
compose=(docker compose "$@")
services=$("${compose[@]}" config --services)
if ! echo "$services" | grep -qx mysql; then
  echo 'This script requires bundled MySQL; use the managed database backup procedure instead.' >&2
  exit 2
fi
mkdir -p "$destination"
snapshot="$destination/$(date -u +%Y%m%dT%H%M%SZ)-$$"
mkdir "$snapshot"
resume_services=()
while IFS= read -r service; do
  if [[ "$service" == ghost || "$service" == metrics ]]; then
    resume_services+=("$service")
  fi
done < <("${compose[@]}" ps --status running --services)
resume() {
  status=$?
  trap - EXIT
  if [[ ${#resume_services[@]} -gt 0 ]]; then
    "${compose[@]}" start "${resume_services[@]}" || status=1
  fi
  exit "$status"
}
trap resume EXIT
if [[ ${#resume_services[@]} -gt 0 ]]; then
  "${compose[@]}" stop "${resume_services[@]}"
fi
"${compose[@]}" exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" mysqldump -u "$MYSQL_USER" --single-transaction --no-tablespaces --set-gtid-purged=OFF "$MYSQL_DATABASE"' > "$snapshot/ghost.sql"
"${compose[@]}" run --rm --no-deps --entrypoint tar ghost -C /var/lib/ghost/content -czf - . > "$snapshot/content.tar.gz"
if echo "$services" | grep -qx metrics; then
  "${compose[@]}" run --rm --no-deps --entrypoint tar metrics -C /data -czf - . > "$snapshot/metrics.tar.gz"
fi
while IFS= read -r container; do
  docker inspect --format '{"reference":{{json .Config.Image}},"imageId":{{json .Image}}}' "$container"
done < <("${compose[@]}" ps -aq) > "$snapshot/images.jsonl"
touch "$snapshot/COMPLETE"
echo "Backup complete: $snapshot"
