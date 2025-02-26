# Use official Node.js image with a smaller size
FROM node:18-alpine AS builder
# Set working directory
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json package-lock.json ./
# Install dependencies and install nodemon globally
RUN npm install --only=production
RUN npm install -g nodemon
# Copy source code
COPY . .
# Set proper permissions for the app directory
RUN chown -R node:node /app
# Set a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
# Expose port
EXPOSE 5000
# Start the server
CMD ["npm", "run", "dev"]
