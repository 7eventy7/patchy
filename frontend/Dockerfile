# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy the built frontend assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy API server files
COPY --from=build /app/server /app/server
COPY --from=build /app/package*.json /app/

# Install production dependencies for API server
RUN npm install --production

# Create directory for nginx pid file
RUN mkdir -p /run/nginx

# Copy start script
COPY <<EOF /app/start.sh
#!/bin/sh
# Start the API server
node server/index.js &

# Start nginx
nginx -g 'daemon off;'
EOF

RUN chmod +x /app/start.sh

# Expose ports
EXPOSE 11777 11778

# Set environment variables
ENV NODE_ENV=production
ENV API_PORT=11778
ENV VITE_API_URL=http://localhost:11778/api

CMD ["/app/start.sh"]