#!/bin/sh

# Start the API server
node /app/server/index.js &
API_PID=$!

# Wait for API server to start
sleep 2

# Start nginx in foreground
nginx -g "daemon off;" &
NGINX_PID=$!

# Handle shutdown
shutdown() {
    echo "Shutting down services..."
    kill $API_PID
    kill $NGINX_PID
    exit 0
}

# Set up signal handling
trap shutdown SIGTERM SIGINT

# Wait for either process to exit
wait $API_PID $NGINX_PID