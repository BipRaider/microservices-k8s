#!/bin/sh
echo [Build the latest]:
docker build -t bipus/ud-query ./query
echo [Build a new version application]:
docker build -t bipus/query:0.0.1 ./query
echo [Push the latest]:
docker push bipus/ud-query
