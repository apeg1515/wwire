FROM node:10

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app/

RUN npm install yarn -g --quite && \
yarn --ignore-engines

COPY . /usr/app

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING true

# webpack react hot reloading file watcher interval
# default is 100ms
ENV CHOKIDAR_INTERVAL 10

CMD [ "npm", "start" ]
