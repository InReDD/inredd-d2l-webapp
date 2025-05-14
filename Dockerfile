FROM node:23-slim AS base

RUN apt-get update && \
    apt-get -y install\
    build-essential \
    curl \
    ca-certificates \
    gcc \
    sudo \
    gnupg2 \
    g++ \
    make 

WORKDIR /app
COPY package*.json .

RUN npm config set registry http://registry.npmjs.org/
RUN npm install
EXPOSE 3001

FROM base AS builder
WORKDIR /app
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

FROM builder AS prod
ENV NODE_ENV=production

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

CMD npm start

FROM base AS dev
ENV NODE_ENV=development
COPY --chown=app:app . .

CMD npm run dev