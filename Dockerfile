# Fase de construcción
FROM node:lts as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Fase de ejecución
FROM nginx:alpine
COPY --from=build /app/dist/pokedex-angular17/browser /usr/share/nginx/html
COPY ./nginx/nginx-prod.conf /etc/nginx/conf.d/default.conf