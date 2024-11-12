# Production stage only - using pre-built assets
FROM nginx:alpine

# Copy pre-built assets
COPY dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 11777
EXPOSE 11777

CMD ["nginx", "-g", "daemon off;"]