echo [Restart event-bus]
kubectl rollout restart deployment event-bus-depl

echo [Restart posts]
kubectl rollout restart deployment posts-depl

echo [Restart comments]
kubectl rollout restart deployment comments-depl

echo [Restart moderation]
kubectl rollout restart deployment moderation-depl

echo [Restart query]
kubectl rollout restart deployment query-depl

echo [clear none images]:
docker image prune

echo [List all images]:
docker images --filter=reference='bipus/*'