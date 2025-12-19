# ----------- STAGE 1: Build dependencies -----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# ----------- STAGE 2: Production image -----------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 4000

CMD ["node", "index.js"]
