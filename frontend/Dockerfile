FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use 'npm install' without '--omit=dev' to ensure 'vite' is available for the build
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
