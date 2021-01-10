
# 1. Build our Angular app
FROM node:12.4.0 as builder

WORKDIR /app
COPY package.json package-lock.json ./
ENV CI=1
RUN npm ci

COPY . .
RUN npm run build:ssr

# 2. Deploy our Angular app to NGINX
FROM nginx AS frontend-browser
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/client-app/browser /usr/share/nginx/html
COPY ./nginx-app.conf /etc/nginx/nginx.conf
EXPOSE 8090
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# 2. Deploy our Angular app server

FROM node:12.4.0-alpine AS ssr-server
COPY --from=builder /app/dist /app/dist/
COPY package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr



