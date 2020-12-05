
# 1. Build our Angular app
FROM node:12.4.0-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
ENV CI=1
RUN npm ci

COPY . .
RUN npm run build -- --prod --output-path=/dist

# 2. Deploy our Angular app to NGINX
FROM nginx:alpine

## Replace the default nginx index page with our Angular app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /dist /usr/share/nginx/html

COPY ./nginx-app.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
