FROM node:14.17.1-alpine

WORKDIR /back
COPY . /app/

RUN yarn install --silent
RUN yarn build
RUN yarn start

EXPOSE 8080