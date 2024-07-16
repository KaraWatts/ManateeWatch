# Build React static files
FROM node:18-alpine as build

WORKDIR /manateewatch/frontend/manatee-watch
COPY ./frontend/manatee-watch/package.json ./
COPY ./frontend/manatee-watch/package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY ./frontend/manatee-watch ./
RUN npm run build

# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /manateewatch/frontend/manatee-watch/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
