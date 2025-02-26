# Use Node.js as base
FROM node:18-alpine
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --only=production
RUN npm install -g expo-cli
# Copy project files
COPY . .
# Set proper permissions for the app directory
RUN chown -R node:node /app
# Expose any necessary port (React Native Metro Bundler uses 8081)
EXPOSE 8081
# Use non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
# Start Metro Bundler for React Native
CMD ["npm", "start"]
