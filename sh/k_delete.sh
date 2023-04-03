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

echo [Delete client]
kubectl delete deployment client-depl
