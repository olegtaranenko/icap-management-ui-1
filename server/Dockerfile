FROM node:12

# Set up Frontend
WORKDIR /usr/bin/proto-app

COPY ./proto-app ./

RUN yarn install --frozen-lockfile && yarn build-localhost


# Set up Server
WORKDIR /usr/bin/server

COPY ./server ./

RUN yarn install --frozen-lockfile && yarn build

EXPOSE 8080

CMD yarn start
