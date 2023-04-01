#!/bin/sh
echo [Build the latest]:
docker build -t bipus/ud-event-bus ./event-bus
echo [Build a new version application]:
docker build -t bipus/event-bus:0.0.1 ./event-bus
echo [Push the latest]:
docker push bipus/ud-event-bus
