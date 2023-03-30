FROM node:16-alpine
WORKDIR /opt/app
COPY package*.json ./
RUN npm i
ADD . .
CMD ["npm", "start"]

