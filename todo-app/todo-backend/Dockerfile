FROM node:18.16.0-alpine3.17

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start