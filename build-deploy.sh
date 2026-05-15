#!/bin/bash
set -e

IMAGE="ghcr.io/n3n-dev/jikji-homepage"
TAG="${1:-v2}"
NAMESPACE="homepage-jikji-ai"
DEPLOYMENT="jikji-homepage"

echo "==> 빌드: $IMAGE:$TAG"
docker build --platform linux/amd64 -t "$IMAGE:$TAG" .

echo ""
echo "==> GHCR 푸시: $IMAGE:$TAG"
docker push "$IMAGE:$TAG"

echo ""
echo "==> K8s 배포: $NAMESPACE/$DEPLOYMENT → $IMAGE:$TAG"
kubectl -n "$NAMESPACE" set image deployment/"$DEPLOYMENT" "$DEPLOYMENT=$IMAGE:$TAG"
kubectl -n "$NAMESPACE" rollout restart deployment/"$DEPLOYMENT"
kubectl -n "$NAMESPACE" rollout status deployment/"$DEPLOYMENT" --timeout=120s

echo ""
echo "배포 완료! ($IMAGE:$TAG)"
