FROM node:12

# Setup Server
WORKDIR /usr/bin/icap-management-portal/server/
COPY ./server ./
RUN yarn install && yarn build

# Setup Frontend
WORKDIR /usr/bin/icap-management-portal/server/frontend
RUN yarn install && yarn build

# Run Server
WORKDIR /usr/bin/icap-management-portal/server/
CMD yarn start
