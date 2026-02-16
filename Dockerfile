#stage 1
FROM node:20 AS node
WORKDIR /app
ADD package*.json ./
RUN npm install
COPY . .
RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 10300
