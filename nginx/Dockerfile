FROM nginx:latest

# Remove the default Nginx config
RUN rm /etc/nginx/nginx.conf

# Copy the main Nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the application-specific config
COPY nginx/manateewatch-nginx.conf /etc/nginx/conf.d/manateewatch-nginx.conf


# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
