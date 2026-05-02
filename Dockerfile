# Stage 1: Build the Frontend (React/Vite)
FROM node:20-slim as build-stage
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the Backend (FastAPI)
FROM python:3.11-slim
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 10000

# Install backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
# We copy the 'app' folder into the container's '/app/app' directory
COPY backend/app ./app

# Copy the built frontend from Stage 1 into the backend's static folder
# This matches the path logic in app/main.py
COPY --from=build-stage /frontend/dist ./app/static

# Expose the port
EXPOSE $PORT

# Start the application
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
