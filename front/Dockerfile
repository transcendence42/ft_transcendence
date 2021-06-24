FROM node:14.17.1-alpine

WORKDIR /front
COPY . /app/

RUN yarn install --silent
RUN yarn build

EXPOSE 8080