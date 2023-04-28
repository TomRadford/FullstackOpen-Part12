FROM node:18 as test-stage

WORKDIR /usr/src/app

COPY . .

RUN CI=true npm test 

FROM node:18 as build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
