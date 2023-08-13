# Stage 1: Build the frontend using Node.js 16
FROM node:16.15-alpine3.16 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:dev

# Stage 2: Serve the built frontend using nginx
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/stockapp-frontend /usr/share/nginx/html

EXPOSE 4200