#!/bin/sh
echo [build posts:latest]:
npm run docker:posts

echo [build comments:latest]:
npm run docker:comments

echo [build event-bus:latest]:
npm run docker:event-bus

echo [build query:latest]:
npm run docker:query

echo [build moderation:latest]:
npm run docker:moderation

echo [build client:latest]:

echo [List all images]:
docker images --filter=reference='bipus/*'

