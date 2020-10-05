FROM node:12

# Set up Frontend
WORKDIR /usr/bin/icap-management-portal/proto-app

COPY ./proto-app ./

RUN yarn install --frozen-lockfile && yarn build


# Set up Server
WORKDIR /usr/bin/icap-management-portal/server

COPY ./server ./

RUN yarn install --frozen-lockfile && yarn build

EXPOSE 8080

CMD yarn start
