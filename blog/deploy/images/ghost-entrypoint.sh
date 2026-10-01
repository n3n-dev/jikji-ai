#!/bin/sh
set -eu
node /opt/jikji/config.mjs
theme_root=/var/lib/ghost/content/themes
mkdir -p "$theme_root" /var/lib/ghost/content/settings
# Replace only our bundled theme. Removed files must not survive an image upgrade.
staging=$(mktemp -d "$theme_root/.jikji-update.XXXXXX")
cleanup() {
  if [ -d "$staging/previous" ] && [ ! -e "$theme_root/jikji-blog" ]; then
    mv "$staging/previous" "$theme_root/jikji-blog"
  fi
  rm -rf "$staging"
}
trap cleanup EXIT
cp -R /opt/jikji-theme "$staging/new"
if [ -e "$theme_root/jikji-blog" ]; then
  mv "$theme_root/jikji-blog" "$staging/previous"
fi
mv "$staging/new" "$theme_root/jikji-blog"
cleanup
trap - EXIT
cp /opt/jikji/routes.yaml /var/lib/ghost/content/settings/routes.yaml
exec docker-entrypoint.sh "$@"
