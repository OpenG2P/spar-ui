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
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000

EXPOSE 3000

CMD npm run build && npm run start