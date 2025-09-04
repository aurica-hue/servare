#!/bin/bash

# Kill any existing processes
pkill -f "uvicorn main:app" || true
pkill -f "next dev" || true

# Wait a moment
sleep 2

echo "Starting FastAPI backend..."
cd /workspaces/servare/services/api
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
FASTAPI_PID=$!

echo "Starting Next.js frontend..."
cd /workspaces/servare
pnpm run dev &
NEXTJS_PID=$!

echo "Servers started!"
echo "FastAPI PID: $FASTAPI_PID"
echo "Next.js PID: $NEXTJS_PID"
echo ""
echo "Access your app at:"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait
