 FROM ubuntu

 WORKDIR /front
 COPY . /front/

 RUN yarn install --silent
 RUN yarn build

 EXPOSE 8080