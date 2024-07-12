# Build React static files
FROM node:18-alpine as build

WORKDIR /manateewatch/frontend
COPY ./frontend/manatee-watch/package.json ./
COPY ./frontend/manatee-watch/package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY ./frontend/manatee-watch ./
RUN npm run build

# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /manateewatch/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

