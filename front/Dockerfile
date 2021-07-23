# FROM node:14.17.1-alpine

# WORKDIR /app
# COPY . /app/

# RUN apk update && apk add bash
# RUN apk install nginx
# RUN yarn install --silent
# RUN yarn build

# EXPOSE 8080
FROM nginx:1.21.1-alpine

WORKDIR /app
# COPY . /app/

COPY ./build /usr/share/nginx/html
COPY ./nginx/front.conf /etc/nginx/sites-available/default
COPY ./nginx/front.conf /etc/nginx/sites-enabled/default
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 8080

