FROM node:18-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM base AS dev
EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

FROM base AS build
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/todo_list /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
