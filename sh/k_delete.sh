echo [Delete event-bus]
kubectl delete deployment event-bus-depl

echo [Delete posts]
kubectl delete deployment posts-depl

echo [Delete comments]
kubectl delete deployment comments-depl

echo [Delete moderation]
kubectl delete deployment moderation-depl

echo [Delete query]
kubectl delete deployment query-depl

echo [clear none images]:
docker image prune

echo [List all images]:
docker images --filter=reference='bipus/*'