# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Set NODE_ENV to development to install devDependencies for build
ENV NODE_ENV=development

# Install all dependencies (including devDependencies)
RUN pnpm install

# Copy the rest of the backend code
COPY . .

# Build TypeScript code (using npx ensures TypeScript is found)
RUN pnpm run build

# Set production environment
ENV NODE_ENV=production

# Prune devDependencies for production
RUN pnpm prune --prod

# Expose the backend port
EXPOSE 3001

# Start the backend server
CMD ["pnpm", "run", "start"] 