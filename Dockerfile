# Stage 1: build Vite app
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # Vite بيطلع dist/

# Stage 2: serve with nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# امسح default config
RUN rm /etc/nginx/conf.d/default.conf

# ننسخ build
COPY --from=build /app/dist . 

# ننسخ config بتاعنا
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
