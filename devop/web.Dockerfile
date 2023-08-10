FROM node:alpine as build-stage

WORKDIR /app

COPY frontend/package*.json /app/

RUN npm install

COPY frontend /app/

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY devop/nginx.conf.d /etc/nginx/conf.d/