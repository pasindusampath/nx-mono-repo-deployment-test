FROM node:18-alpine AS base

# Enable Corepack for Yarn
RUN corepack enable && corepack prepare yarn@4.0.2 --activate

# Build stage
FROM base AS builder
WORKDIR /app

# Copy workspace files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig.json ./apps/api/
COPY tsconfig.base.json ./

# Install dependencies
RUN yarn workspaces focus api --production=false

# Copy source code
COPY apps/api/src ./apps/api/src

# Build TypeScript
WORKDIR /app/apps/api
RUN yarn build

# Production stage
FROM base AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built files and production dependencies
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

USER nodejs

EXPOSE 3000

CMD ["node", "dist/main.js"]
