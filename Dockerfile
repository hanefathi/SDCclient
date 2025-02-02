# Use an official Node.js runtime as the base image
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN yarn build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the built files from the builder stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]