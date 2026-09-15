# Ghost 운영 배포

서버 개발자는 아래 두 방식 중 하나를 선택한다. 같은 Ghost 이미지와 테마를 사용하며 두 구성을 동시에 실행할 필요는 없다.

| 환경 | 시작 파일 | DB 선택 |
|---|---|---|
| Docker가 설치된 서버 | [Compose](#1-docker-compose) | MySQL 함께 실행 또는 기존 MySQL 연결 |
| 기존 Kubernetes 클러스터 | [Kubernetes](#2-kubernetes) | MySQL StatefulSet 또는 기존 MySQL 연결 |

이 구성은 Ghost와 블로그 전용 조회·공유 서비스용이다. Ghost의 별도 Tinybird/ActivityPub 서비스는 포함하지 않는다. 실제 서버·DNS·TLS·SMTP·백업 저장소는 운영 환경에 맞게 제공해야 한다. 예시에는 실제 서버 주소나 비밀번호가 없다.

명령의 `example.com`, `registry.example.com`, `/secure/path`는 운영자가 정한 도메인·레지스트리·비공개 파일 경로로 바꾼다. 필요한 비공개 디렉터리는 먼저 만들고 접근 권한을 제한한다.

## 공통 구조와 준비 값

- Ghost: `images/Ghost.Dockerfile`, Ghost 6.62.0, 단일 인스턴스. `NODE_ENV=production`, MySQL 8 사용.
- 글·사용자·설정: MySQL. 이미지·파일·테마: Ghost content 볼륨. 조회·공유 집계: 별도 `/data` 볼륨의 SQLite.
- `images/config.mjs`가 실행 시 설정을 검사하고 권한 600으로 Ghost 설정을 생성한다. 필수 값이 없으면 실행하지 않는다. 관리자 기기 인증을 해제하지 않는다.
- 이미지는 저장소 테마를 포함한다. 실행할 때 `jikji-blog` 테마와 `routes.yaml`을 갱신하므로 이 두 항목은 저장소에서 관리한다. Admin에서 수정한 동일 테마/라우팅은 다음 배포에서 덮어쓴다. 게시물·이미지·사용자 데이터는 덮어쓰지 않는다.
- Ghost와 통계는 각각 1개만 실행한다. Ghost 수평 확장이나 SQLite 파일의 여러 프로세스 공유를 사용하지 않는다.
- MySQL/node의 계열 태그는 보안 업데이트로 바뀔 수 있다. 실제 릴리스는 빌드한 이미지와 DB 이미지의 digest를 기록·고정하고 업그레이드마다 검증한다. 애플리케이션 이미지는 커밋 SHA 등 변경 불가능한 태그를 사용한다.

| 값 | 용도 |
|---|---|
| `GHOST_URL` | 최종 HTTPS 주소. 기본 예시 `https://example.com/blog` |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | MySQL 연결. DB는 미리 생성하거나 동봉 MySQL 사용 |
| `MYSQL_ROOT_PASSWORD` | 동봉 MySQL을 새로 초기화할 때만 필요 |
| `MAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` | 관리자 인증·비밀번호 재설정 메일. 587은 보통 `false`(STARTTLS), 465는 `true` |
| `BLOG_ORIGIN` | 집계 허용 origin. `https://example.com`처럼 경로·끝 슬래시 제외 |
| `GHOST_CONTENT_API_KEY` | 선택 통계 서비스가 공개 글을 조회할 Content API 키. Admin API 키 아님 |

DB 암호·메일 암호는 개인 `.env` 또는 Secret 관리 시스템에만 저장한다. `.env.example`의 빈 칸을 채운 파일은 커밋하지 않는다. 실제 환경의 `docker compose config` 전체 출력도 비밀 값을 포함하므로 공유하지 않는다(`--quiet` 사용).

기존 관리형 MySQL의 TLS가 필수이면 CA 파일을 읽기 전용으로 마운트하고 Ghost에 `DB_SSL_CA_FILE=/run/certs/mysql-ca.pem`을 추가한다. 설정 생성기가 CA 검증을 활성화한다. DB를 바꾸면 네트워크 접근 허용과 인증서 이름이 DB_HOST에 맞는지도 확인한다.

## URL과 회사 사이트 연결

운영 이미지가 생성하는 테마·라우팅은 다음과 같다. 개발용 `blog/compose.yaml`과 원본 테마는 바뀌지 않는다.

| 화면 | `GHOST_URL=https://example.com/blog`일 때 |
|---|---|
| 블로그 홈 | `/blog/` |
| Blog 목록·글 | `/blog/posts/`, `/blog/posts/{slug}/` |
| News 목록·글 | `/blog/news/`, `/blog/news/{slug}/` |
| RSS | `/blog/posts/rss/`, `/blog/news/rss/` |
| 관리자 | `/blog/ghost/` |
| 이미지·자원 | `/blog/content/…`, `/blog/assets/…` |
| 선택 조회·공유 API | `/views` (Ghost 경로 밖, 같은 HTTPS origin) |

Ghost가 `/blog` 접두사를 처리한다. 프록시가 이 접두사를 제거하면 자원·관리자 주소가 깨진다. 기존 공개 블로그를 이전하는 경우에는 이전 글 URL에서 새 URL로의 리디렉션을 별도로 마련한다. 로컬 샘플 글/SQLite를 운영 DB에 그대로 복사하지 않는다.

**회사 사이트가 GitHub Pages라면:** Pages만으로 `/blog/`를 Ghost에 전달할 수 없다. 도메인의 앞단에 경로별 프록시가 필요하다. 기존 `/`는 회사 사이트로, `/blog/`는 Ghost로 보내도록 인프라 담당자가 구성한다. DNS만 Ghost로 바꾸면 기존 회사 사이트가 사라질 수 있다. 이 폴더의 예시는 기존 회사 루트 경로를 변경하지 않는다.

- 같은 서버의 NGINX: [proxy/nginx-locations.conf](proxy/nginx-locations.conf)를 해당 도메인의 **기존 HTTPS server 블록 안에** 넣는다. 인증서 발급·갱신 및 80→443 리디렉션은 기존 운영 정책을 사용한다. `nginx -t` 후 reload한다.
- Kubernetes: 예제 Ingress의 host·IngressClass·TLS Secret을 변경한다. `/blog` 경로를 보존한다. 컨트롤러별 업로드 용량/타임아웃 옵션은 팀 표준을 적용한다. 예: 50MB, 90초.
- 별도 서브도메인이면 `GHOST_URL=https://blog.example.com`으로 하고 프록시/Ingress 경로를 `/`로 바꾼다. 회사 메뉴 `/blog/`도 해당 주소로 연결하거나 리디렉션해야 한다.

## 1. Docker Compose

Docker Engine와 Compose v2가 설치된 Linux 서버에서 실행한다. 저장소 루트 기준:

```sh
cd blog/deploy/compose
cp .env.example .env
chmod 600 .env
# .env의 도메인, SMTP, 비밀번호를 편집한다.
# DB 암호는 예를 들어 openssl rand -hex 32로 별도 생성한다.
```

**동봉 MySQL 사용:** `.env`에서 `DB_HOST=mysql`, DB 이름·사용자·두 DB 암호를 설정한다.

```sh
docker compose --env-file .env -f compose.yaml -f compose.mysql.yaml config --quiet
docker compose --env-file .env -f compose.yaml -f compose.mysql.yaml build ghost
docker compose --env-file .env -f compose.yaml -f compose.mysql.yaml up -d --wait --wait-timeout 600
docker compose --env-file .env -f compose.yaml -f compose.mysql.yaml ps
```

**기존 MySQL 사용:** 빈 Ghost 전용 DB와 해당 DB 권한을 가진 사용자를 만들고 연결 값을 설정한다. `compose.mysql.yaml`을 제외한다.

```sh
docker compose --env-file .env -f compose.yaml config --quiet
docker compose --env-file .env -f compose.yaml build ghost
docker compose --env-file .env -f compose.yaml up -d --wait --wait-timeout 600
```

컨테이너 포트는 loopback에만 열린다. 프록시가 다른 서버에 있다면 관리되는 사설 인터페이스·방화벽에 맞게 바인딩을 조정한다. DB 포트는 공개하지 않는다.

새 서버에서 `content` 볼륨은 이미지의 소유권으로 초기화된다. 기존 호스트 디렉터리를 bind mount한다면 먼저 Ghost UID/GID 1000이 쓸 수 있게 준비한다. 볼륨명은 Compose 프로젝트에 종속되므로 운영 중 프로젝트명/작업 디렉터리를 임의로 바꾸지 않는다. `down -v`는 운영 데이터까지 삭제하므로 사용하지 않는다.

## 2. Kubernetes

kubectl/Kustomize, 컨테이너 레지스트리, 동적 PVC를 지원하는 StorageClass, HTTPS Ingress 또는 Gateway를 준비한다. 여기서는 표준 Ingress 예시를 제공한다. 기존 Gateway 환경이면 Service를 해당 HTTPRoute에 연결한다.

먼저 서버 아키텍처에 맞는 이미지를 빌드하고 레지스트리에 올린다. 저장소 루트에서:

```sh
cd blog
docker buildx build --platform linux/amd64 -f deploy/images/Ghost.Dockerfile \
  -t registry.example.com/team/jikji-ghost:release-1 --push .
docker buildx build --platform linux/amd64 -f deploy/images/Metrics.Dockerfile \
  -t registry.example.com/team/jikji-blog-metrics:release-1 --push .
cp -R deploy/kubernetes/example deploy/kubernetes/site
```

`registry.example.com`·태그를 실제 레지스트리·커밋 SHA로 바꾼다. ARM 서버는 `linux/arm64`, 혼합이면 `linux/amd64,linux/arm64`로 빌드한다. CI에서 build/push를 자동화할 경우 레지스트리 권한을 기존 Secret으로 전달한다.

`site/`는 Git에서 제외되며 다음 항목을 수정한다.

| 파일 | 수정 내용 |
|---|---|
| `site/kustomization.yaml` | 공개 URL, DB·메일 설정, 이미지 이름/태그. 기존 DB라면 `../mysql` 제거 |
| `site/ingress.yaml` | 실제 도메인, IngressClass, TLS Secret. `/blog` 접두사 보존 |
| `site/namespace.yaml` 및 kustomization namespace | 팀의 네임스페이스. 변경 시 아래 명령에도 동일하게 적용 |
| PVC/리소스 patch | `ghost-content` 10Gi, MySQL 20Gi 기본값을 환경에 맞게 변경. 필요하면 `storageClassName`을 지정 |

기본 StorageClass가 없으면 PVC에 클래스가 명시돼야 한다. 볼륨은 삭제 시 보존되는 운영 정책으로 설정한다. Ghost와 집계 SQLite는 단일 인스턴스가 사용하는 디스크형 저장소를 사용하고 SQLite를 공유 NFS 파일로 운영하지 않는다. MySQL 예시는 초기화 시 파일 권한을 설정하므로 컨테이너 root 실행을 허용하는 환경을 전제로 한다. 클러스터가 이를 금지하면 팀의 관리형 DB/승인된 MySQL 배포를 사용한다.

Secret은 클러스터에 직접 생성한다. 다음 파일은 저장소 밖에 두며 셸 history에 비밀번호를 직접 넣지 않는다.

```sh
kubectl apply -f deploy/kubernetes/site/namespace.yaml
cp deploy/kubernetes/.secrets.env.example /secure/path/ghost.secrets.env
chmod 600 /secure/path/ghost.secrets.env
# 파일에 DB_PASSWORD, SMTP_PASSWORD와 동봉 DB 사용 시 MYSQL_ROOT_PASSWORD를 입력한다.
kubectl -n jikji-blog create secret generic ghost-secrets \
  --from-env-file=/secure/path/ghost.secrets.env
# 팀의 인증서 관리 방식으로 ghost-tls Secret을 준비한다.
kubectl kustomize deploy/kubernetes/site > /secure/path/ghost.rendered.yaml
kubectl apply --dry-run=server -f /secure/path/ghost.rendered.yaml
kubectl apply -k deploy/kubernetes/site
kubectl -n jikji-blog rollout status deployment/ghost --timeout=600s
kubectl -n jikji-blog get pods,pvc,ingress
```

이미지 레지스트리가 비공개이면 팀이 발급한 `imagePullSecrets`를 Ghost/metrics Pod에 추가한다. 기존 Secret 교체는 팀 Secret 관리 도구를 사용하고 Ghost/metrics Deployment를 재시작한다. ConfigMap 값 변경은 Kustomize가 이름 해시를 바꾸어 Pod를 갱신한다. DB 암호는 Secret만 바꿔도 DB 내부 사용자 암호가 바뀌지 않으므로 DB와 함께 회전한다.

## 3. 최초 관리자 설정

1. 서버 공개 전 또는 접근을 제한한 상태에서 HTTPS `/blog/ghost/`에 접속해 소유자 계정을 만든다. 초기 소유자 등록 페이지를 외부에 무방비로 두지 않는다.
2. Ghost Admin → Design에서 제공된 `jikji-blog` 테마를 활성화한다. 이미지 안에 운영 경로용 테마가 설치돼 있으므로 개발용 테마 ZIP을 다시 업로드하지 않는다.
3. 사이트 이름·한국어·시간대·회사 주소와 Navigation을 설정한다. 예시: Home `/blog/`, Blog `/blog/posts/`, News `/blog/news/`, About `/blog/about/`. About 페이지가 필요하면 직접 만든다.
4. 글의 첫 태그는 Blog의 slug `blog`, News의 slug `news`로 지정한다. 내부 태그도 앞에 두지 않는다. 운영 이미지는 `deploy/routes.yaml`을 사용한다.
5. 기기 인증/비밀번호 재설정 메일 수신, 이미지 업로드, 초안→발행→수정→게시 취소를 시험한다. 운영 SMTP 실제 전달은 별도 확인이 필요하다.

기존 Ghost에서 이전하면 먼저 Ghost 공식 내보내기/가져오기 절차와 이미지·리디렉션 이전을 검토한다. 이 구성은 기존 SQLite 데이터를 MySQL로 자동 변환하지 않는다.

## 4. 조회·공유 서비스 (선택)

Ghost Admin → Integrations에서 **Content API Key**를 생성한다. 공개 Ghost 주소에 집계 컨테이너가 HTTPS로 접근할 수 있어야 한다. 사설 인증서면 컨테이너의 신뢰 CA도 설정한다.

Compose에서는 `.env`에 `GHOST_CONTENT_API_KEY`, `BLOG_ORIGIN`을 입력하고 기존 명령에 `-f compose.metrics.yaml`을 추가한다.

```sh
docker compose --env-file .env -f compose.yaml -f compose.mysql.yaml -f compose.metrics.yaml build metrics
docker compose --env-file .env -f compose.yaml -f compose.mysql.yaml -f compose.metrics.yaml up -d --wait --wait-timeout 600
```

Kubernetes에서는 `GHOST_CONTENT_API_KEY=…` 한 줄만 들어 있는 별도 비공개 파일로 `ghost-metrics-secret`을 만든다.

```sh
kubectl -n jikji-blog create secret generic ghost-metrics-secret \
  --from-env-file=/secure/path/ghost-metrics.secrets.env
# site/kustomization.yaml의 resources에 ../metrics를 추가한다.
# site/ingress.yaml에 아래 경로를 추가한 뒤 apply한다.
```

```yaml
- path: /views
  pathType: Exact
  backend:
    service:
      name: ghost-metrics
      port:
        number: 2369
```

Compose의 NGINX도 `/views` location을 활성화한다. Origin 헤더를 보존하고 프록시의 요청 크기/빈도 제한을 설정한다. Ghost 테마 설정 `views_api_url`에 `https://example.com/views`를 입력한다. 키가 아니라 **공개 endpoint URL만** 테마에 입력한다. API 미설정·장애 시에도 글과 링크 복사는 동작한다. 값은 고유 인원 수가 아니라 30분 중복 제한을 적용한 방문/복사 횟수다.

## 5. 백업·복구·업데이트

**동봉 MySQL Compose:** 유지보수 시간에 아래 스크립트를 실행한다. Ghost와 실행 중인 metrics를 잠시 중지해 SQL·업로드 파일·SQLite를 함께 백업하고, 종료 시 원래 실행 중이던 서비스를 다시 올린다. 실패한 폴더에는 `COMPLETE` 파일이 없다.

```sh
cd blog/deploy/compose
bash backup.sh /secure/backups --env-file .env -f compose.yaml -f compose.mysql.yaml
# 집계를 사용한다면 마지막에 -f compose.metrics.yaml도 전달한다.
```

백업은 서비스 데이터와 이미지 목록을 포함한다. 비밀 값/SMTP 설정은 별도의 Secret 백업 정책으로 보관한다. 백업을 암호화해 서버 밖에 보관하고 보존 기간·주기·복구 점검을 운영 정책으로 정한다. 같은 서버 디스크만으로는 장애 복구가 되지 않는다.

**복구 연습:** 운영과 다른 프로젝트·빈 볼륨·포트를 사용한다. 아래 `dc`는 그 격리 복구 환경의 Compose 명령이다. 운영 볼륨에 실행하지 않는다.

```sh
dc() { docker compose -p jikji-blog-restore --env-file /secure/path/restore.env -f compose.yaml -f compose.mysql.yaml "$@"; }
dc up -d --wait mysql
dc exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" mysql -u "$MYSQL_USER" "$MYSQL_DATABASE"' < /secure/backup/ghost.sql
dc run --rm --no-deps --entrypoint tar ghost -xzf - -C /var/lib/ghost/content < /secure/backup/content.tar.gz
# metrics 사용 시 dc에 해당 overlay를 추가하고 /data에 metrics.tar.gz를 같은 방법으로 복구한다.
dc up -d --wait --wait-timeout 600
```

`restore.env`에서 loopback 공개 포트와 GHOST_URL을 격리 환경에 맞춘다. 동봉 DB 초기화 때와 같은 DB 자격 증명을 사용한다. 새 Ghost가 DB 마이그레이션을 적용할 수 있으므로 **백업 당시 이미지 버전으로** 먼저 복구한다.

**Kubernetes/관리형 DB:** Ghost와 metrics를 0개로 내려 쓰기를 멈춘 다음 DB의 일관된 덤프/스냅샷과 content·metrics PVC 스냅샷을 같은 유지보수 시점에 만든다. 동봉 MySQL 덤프 예시는 다음과 같다.

```sh
kubectl -n jikji-blog scale deployment/ghost --replicas=0
# 집계를 사용하면 deployment/ghost-metrics도 0으로 내린다.
kubectl -n jikji-blog wait --for=delete pod -l app=jikji-ghost --timeout=120s
# metrics 사용 시 app=jikji-ghost-metrics Pod의 종료도 같은 방식으로 기다린다.
kubectl -n jikji-blog exec mysql-0 -- sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" mysqldump -u "$MYSQL_USER" --single-transaction --no-tablespaces --set-gtid-purged=OFF "$MYSQL_DATABASE"' > /secure/backup/ghost.sql
# 팀의 CSI VolumeSnapshot/백업 도구로 ghost-content와 ghost-metrics PVC를 백업한다.
# 스냅샷 완료를 확인한 뒤 재개한다.
kubectl -n jikji-blog scale deployment/ghost --replicas=1
```

CSI 스냅샷 기능이 없는 환경은 Pod가 멈춘 PVC를 백업 전용 Pod에 마운트하여 tar로 복사하는 팀 절차가 필요하다. PVC가 `Bound`인 것은 백업이 있다는 뜻이 아니다. Secret/Ingress 구성도 별도로 보관한다. 복구 시 새 네임스페이스·새 PVC로 복원하고 DB를 복구한 다음 원래 이미지 버전으로 시작해 점검한다. metrics도 원래 1개였다면 재개한다.

**업데이트:** 백업 → 새 이미지 빌드·고정 태그 push → Compose image 값 또는 Kustomize image 변경 → 재배포 → 아래 검증 순서다. Ghost와 content 쓰기는 단일 인스턴스이므로 짧은 중단이 발생한다. DB 마이그레이션 후 단순 이미지 다운그레이드는 안전한 롤백이 아니다. 필요하면 백업 DB·content·metrics를 함께 복구한다.

## 6. 배포 완료 확인

- 회사 `/`와 `/products/`가 그대로 열리고 `/blog/`·`/blog/posts/`·`/blog/news/`가 HTTPS로 열린다.
- 자원·이미지 요청에 HTTP/localhost 주소나 `/blog/blog/` 중복이 없다. canonical·RSS·sitemap·관리자 URL도 확인한다.
- 소유자 로그인, 새 기기 인증 메일, 이미지 업로드, Blog/News 발행과 분류가 동작한다.
- FAQ 여닫기, 목차·코드 블록, 모바일 320/375/430px의 가로 넘침, 공유 복사를 확인한다.
- 통계 사용 시 방문과 복사가 각각 증가하고 같은 브라우저의 30분 내 중복은 제외된다. 재시작 후 숫자가 유지된다.
- 재시작 후 게시물·업로드가 유지되고 백업을 별도 환경에 복구할 수 있다.

저장소 검증은 `cd blog && npm ci && npm test && npm run check:theme` 및 `node deploy/validate.mjs`로 수행한다. 마지막 명령은 Docker Compose와 kubectl이 필요하며 렌더링만 한다(운영 서버에 적용하지 않음). 실제 TLS·메일·클러스터 스토리지·외부 접속은 대상 환경에서 위 절차로 확인한다.

## 공식 참고

- [Ghost 운영 요구사항](https://docs.ghost.org/hosting/), [Ghost Docker 설치](https://docs.ghost.org/install/docker), [Ghost 단일 인스턴스·MySQL 제약](https://docs.ghost.org/faq)
- [Docker Compose 운영](https://docs.docker.com/compose/how-tos/production/)
- [Kubernetes Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/), [영속 볼륨](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
