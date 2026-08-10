# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN HUSKY=0 npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
