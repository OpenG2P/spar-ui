FROM node:18-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

RUN chown -R nextjs:nodejs /app

USER nextjs

# Install dependencies based on the preferred package manager
COPY --chown=nextjs:nodejs package.json package-lock.json* ./
RUN npm ci

COPY --chown=nextjs:nodejs . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ARG NEXT_TELEMETRY_DISABLED 1
ARG NODE_ENV production
ARG HOSTNAME "0.0.0.0"
ARG PORT 3000
ARG NEXT_PUBLIC_BASE_PATH /selfservice
ARG NEXT_PUBLIC_BASE_API_PATH /spar/v1

EXPOSE 3000

RUN npm run build
CMD npm run start