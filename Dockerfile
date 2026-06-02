FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM base AS dev
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200"]

FROM base AS build
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist/home-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
