FROM nginx:latest

# Remove the default Nginx config
RUN rm /etc/nginx/nginx.conf

# Copy the main Nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the application-specific config
COPY nginx/manateewatch-nginx.conf /etc/nginx/conf.d/manateewatch-nginx.conf

# Copy SSL certificates
COPY nginx/ssl_cert.pem /etc/nginx/ssl/ssl_cert.pem
COPY nginx/ssl_cert_key.key /etc/nginx/ssl/ssl_cert_key.key

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
