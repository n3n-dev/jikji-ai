# JIKJI AI Landing Page

직지 홈페이지 프로젝트입니다.
A modern, responsive, multilingual landing page for JIKJI AI.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## 로컬 빌드 확인

```bash
npm run build
npx serve out
```

접속: http://localhost:3000

## Kubernetes 배포 매니페스트

Kubernetes 배포는 합쳐진 매니페스트만 사용합니다.

- `k8s/combined.yaml`: main 브랜치용 d3 배포
- `k8s/combined-prod.yaml`: `v*` 태그용 prod 배포

두 파일 모두 Namespace, Deployment, Service, Ingress를 포함합니다.

## 배포

### 1. 빌드

```bash
npm run build
```

`out/` 폴더가 생성됩니다.

### 2. 서버에 업로드 (로컬에서 실행)

```bash
rsync -avz --delete \
  -e "ssh -i your-key.pem" \
  ./out/ \
  ubuntu@15.165.205.147:/home/ubuntu/homepage_jikji/out/
```

업로드 완료 즉시 https://jikji.ai 에 반영됩니다. (nginx reload 불필요)

### 서버 직접 접속이 필요한 경우

```bash
ssh -i your-key.pem ubuntu@15.165.205.147
```

nginx 설정 파일: `/etc/nginx/sites-enabled/default`
