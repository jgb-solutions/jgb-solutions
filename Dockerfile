# Build stage
FROM oven/bun:latest AS build

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install ALL dependencies (including devDependencies needed for build)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
# TanStack Start with Rolldown outputs to dist/
ENV NODE_ENV=production
ENV BUILD_TARGET=bun
RUN bun run build

# Production stage
FROM oven/bun:latest AS production

WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Use non-root user for security
USER bun

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Start the server
CMD ["bun", "run", "dist/server/server.js"]
