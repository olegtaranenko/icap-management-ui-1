FROM node:12

# Create app dir
WORKDIR /usr/src/app

# Copy package.json AND package-lock.json
COPY package*.json ./

RUN npm install yarn && \
    yarn install
    #yarn install --frozen-lockfile
#RUN npm ci --only=production

COPY . .

EXPOSE 2443
CMD [ "node", "server.js" ]