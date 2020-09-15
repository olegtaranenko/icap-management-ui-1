FROM node:12

# Create app dir
WORKDIR /usr/src/app

# Copy package.json AND package-lock.json
COPY package*.json ./

# Install NPM packages
RUN npm install yarn && \
    yarn install --frozen-lockfile

COPY . .

EXPOSE 2443
CMD [ "node", "src/server.ts" ]