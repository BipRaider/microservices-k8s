#!/bin/sh
echo [-----------Check Pods-ingress-nginx------]
kubectl get pods -n ingress-nginx

echo [------Check Deployments-ingress-nginx----]
kubectl get deployments -n ingress-nginx

echo [-------Check Services-ingress-nginx------]
kubectl get services -n ingress-nginx

echo [-----------Check describe --nginx--------]
kubectl describe service -n ingress-nginx

echo [-----------------------------------------]
echo [-----------Check Application-------------]
echo [-----------------------------------------]

echo [-----------Check Pods--------------------]
kubectl get pods

echo [-----------Check Deployments-------------]
kubectl get deployments

echo [-----------Check Services----------------]
kubectl get services

echo [-----------Check query-------------------]
kubectl describe service query

echo [-----------Check event-bus---------------]
kubectl describe service event-bus

echo [-----------Check posts-------------------]
kubectl describe service posts

echo [-----------Check comments----------------]
kubectl describe service comments

echo [-----------Check moderation--------------]
kubectl describe service moderation

echo [------------Check client-----------------]
kubectl describe service client

echo [---Show running and stopped containers---]
docker ps -a