#!/bin/sh
echo [Build the latest]:
docker build -t bipus/ud-moderation ./moderation
echo [Build a new version application]:
docker build -t bipus/moderation:0.0.1 ./moderation
echo [Push the latest]:
docker push bipus/ud-moderation
