FROM node:12

# Set up Frontend
WORKDIR /usr/bin/icap-management-portal/frontend

COPY ./frontend ./

RUN yarn install && yarn build


# Set up Server
WORKDIR /usr/bin/icap-management-portal/server

COPY ./server ./

RUN yarn install && yarn build

CMD yarn start
