FROM node:14.17.1-alpine

WORKDIR /front
COPY . /front/

RUN yarn install --silent
RUN yarn build

EXPOSE 8080