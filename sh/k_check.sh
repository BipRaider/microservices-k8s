#!/bin/sh
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