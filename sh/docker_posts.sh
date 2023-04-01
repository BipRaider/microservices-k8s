#!/bin/sh
echo [Build the latest]:
docker build -t bipus/ud-posts:latest ./posts
echo [Build a new version application]:
docker build -t bipus/posts:0.0.1 ./posts
echo [Push the latest]:
docker push bipus/ud-posts:latest
