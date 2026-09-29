# Stage 1: Build React assets
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
RUN echo "Rebuilding with REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL"
RUN npm run build

# Stage 2: Serve static build with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]