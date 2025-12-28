# --- Stage 1: Build the app ---
FROM node:20-alpine AS build
WORKDIR /app

# Accept the API key as a build argument
ARG GEMINI_API_KEY

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Write the API key to .env.local before building
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

# Build the project
RUN npm run build

# --- Stage 2: Serve the app ---
FROM nginx:alpine

# Copy the custom Nginx config we made
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run uses port 8080 by default
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
