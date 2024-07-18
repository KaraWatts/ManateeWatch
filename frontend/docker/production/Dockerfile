# Build React static files
FROM node:18-alpine as builder

WORKDIR /manateewatch/frontend
ADD ./frontend/package.json ./
ADD ./frontend/package-lock.json ./
RUN npm cache clean --force && \
    npm install -g npm@latest --legacy-peer-deps
ADD ./frontend /manateewatch/frontend
RUN npm run build

# Serve static files with nginx
FROM nginx:stable-alpine
COPY --from=builder /manateewatch/frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ADD ./frontend/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
