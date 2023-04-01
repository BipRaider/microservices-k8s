echo [Restart posts]
kubectl apply -f ./infra/k8s/posts-depl.yaml
echo [Restart comments]
kubectl apply -f ./infra/k8s/comments-depl.yaml
echo [Restart moderation]
kubectl apply -f ./infra/k8s/moderation-depl.yaml
echo [Restart query]
kubectl apply -f ./infra/k8s/query-depl.yaml
echo [Restart event-bus]
kubectl apply -f ./infra/k8s/event-bus-depl.yaml