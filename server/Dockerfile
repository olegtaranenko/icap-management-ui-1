FROM node:12

# Create app dir
WORKDIR /usr/src/app

# Copy package.json AND yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install NPM packages
RUN yarn install --frozen-lockfile

COPY . .
COPY ../proto-app ./proto-app

EXPOSE 8080

CMD yarn build && \
    yarn start