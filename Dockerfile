# Use a lightweight Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your application
COPY . .

# Expose the port your app runs on (optional, useful for Docker networks)
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]
