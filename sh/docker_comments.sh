#!/bin/sh
echo [Build the latest]:
docker build -t bipus/ud-comments ./comments
echo [Build a new version application]:
docker build -t bipus/comments:0.0.1 ./comments
echo [Push the latest]:
docker push bipus/ud-comments
