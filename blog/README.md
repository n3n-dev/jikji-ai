# JIKJI Blog

Ghost 테마, Markdown 게시 도구, 조회·공유 집계 서비스입니다.

- **운영 서버 개발자:** [배포 안내](deploy/README.md)에서 Docker Compose 또는 Kubernetes를 선택하세요. 운영 DB·저장소·도메인·메일·백업 설정과 실행 순서가 포함돼 있습니다.
- **글 작성자:** [FAQ 작성 안내](docs/faq.md)를 참고하세요.
- **테마 검사:** 이 폴더에서 `npm ci`, `npm test`, `npm run check:theme`, `npm run package:theme`를 실행합니다.

운영 배포는 `deploy/` 구성을 사용합니다. 이 폴더의 `compose.yaml`은 개발용입니다.
