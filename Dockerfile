FROM node:16.6.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

EXPOSE ${PORT}

CMD [ "node", "dist/index.js" ]