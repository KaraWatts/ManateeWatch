# Build React static files
FROM node:18-alpine as builder

WORKDIR /manateewatch/frontend/manatee-watch
ADD ./frontend/manatee-watch/package.json ./
ADD ./frontend/manatee-watch/package-lock.json ./
RUN npm install -g npm@latest --legacy-peer-deps
ADD ./frontend /manateewatch/frontend
RUN npm run build

# Serve static files with nginx
FROM nginx:stable-alpine
COPY --from=builder /manateewatch/frontend/manatee-watch/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ADD ./frontend/manatee-watch/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
