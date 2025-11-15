# Use official Nginx image
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your frontend files into the container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80