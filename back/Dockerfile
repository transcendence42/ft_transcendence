FROM node:14.17.1-alpine

WORKDIR /app
COPY . /app/

RUN apk update && apk add bash
RUN yarn install --silent
RUN yarn build

EXPOSE 5500