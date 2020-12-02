FROM node:12.4.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD npm run buildprod

FROM nginx:1.17.1:alpine as prod-stage
COPY --from=build /app/dist/se-angular-app /usr/share/nginx/html
EXPOSE 80
COPY ./nginx-app.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off"]

