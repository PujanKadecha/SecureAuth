# Node 24 Alpine runtime
FROM node:24-alpine

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]