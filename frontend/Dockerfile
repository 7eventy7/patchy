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

# Install nginx and curl for healthcheck
RUN apk add --no-cache nginx curl

# Create directory for nginx pid file
RUN mkdir -p /run/nginx

# Copy the built frontend assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create server directory and copy API server files
COPY --from=build /app/server /app/server
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy start script and set permissions
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose ports
EXPOSE 11777 11778

# Set environment variables
ENV NODE_ENV=production \
    API_PORT=11778 \
    VITE_API_URL=http://localhost:11778/api

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:11777/health || exit 1

CMD ["/app/start.sh"]