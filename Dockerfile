# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ../package*.json ./
RUN npm install
COPY . .
ARG MODE=production
RUN ./node_modules/.bin/vue-cli-service build --mode ${MODE}

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]