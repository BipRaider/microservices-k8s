#!/bin/sh
echo [Build the latest]:
docker build -t bipus/ud-client ./client
echo [Build a new version application]:
docker build -t bipus/client:0.0.1 ./client
echo [Push the latest]:
docker push bipus/ud-client
