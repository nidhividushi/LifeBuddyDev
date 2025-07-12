# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Set NODE_ENV to development to install devDependencies for build
ENV NODE_ENV=development

# Install all dependencies (including devDependencies)
RUN pnpm install

# Copy the rest of the backend code
COPY . .

# Build TypeScript code
RUN pnpm run build

# (Optional) Prune devDependencies for production
ENV NODE_ENV=production
RUN pnpm prune --prod

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["pnpm", "run", "start"] 