# Build frontend
FROM node:20 as frontend-builder

WORKDIR /app/frontend

# Set NODE_ENV to development for build stage
ENV NODE_ENV=development \
    VITE_API_URL=/api

# Copy frontend package files
COPY frontend/package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Type check and build
RUN npm run build

# Build backend
FROM node:20 AS backend-builder

WORKDIR /app/backend

# Set NODE_ENV to development for build stage
ENV NODE_ENV=development

# Copy backend package files
COPY backend/package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy backend source code
COPY backend/ .

# Type check and build
RUN npm run build

# Production stage
FROM node:20-slim

# Install nginx and supervisor
RUN apt-get update && apt-get install -y nginx supervisor curl && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend production dependencies and install
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copy backend build
COPY --from=backend-builder /app/backend/dist ./backend/dist

# Copy frontend build and nginx config
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Create supervisor configuration
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create directory for Docker socket
RUN mkdir -p /var/run

# Expose ports
EXPOSE 11777 11778

# Set environment variables
ENV NODE_ENV=production \
    PORT=11778 \
    DOCKER_PATH=/var/run/docker.sock

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:11777 || exit 1

# Start supervisor
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]