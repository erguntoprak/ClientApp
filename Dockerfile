FROM node:12.7-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY ./dist ./dist

WORKDIR /usr/src/app

EXPOSE 4000

CMD npm run serve:ssr
