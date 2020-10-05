# Server

## Local Development

### Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)

### Running the Server Locally (Node.js)
#### Make sure you're in the ./server directory of the project.
#### Yarn
```
npm install -g yarn
```
  
This command will install the Yarn package manager. Yarn is used to build the project.
  
#### Installation
```
yarn install
```
  
Installs all NPM packages and dependencies specified in the package.json file.
  
#### Running the Server
```
yarn dev
```
  
This command runs the 'dev' script in the package.json file, which starts a local development server, the server is exposed on port 8080. Navigating to http://localhost:8080 should show the homepage.
  
<hr/>    
  
### Running the Server Locally (Docker)
#### Make sure you're in the root directory of the project and Docker is running.
  
#### Build the Docker Image
```
docker build --tag icap-management-portal -f server/Dockerfile .
```
  
This command builds the Docker image from the Dockerfile, [docker build](https://docs.docker.com/engine/reference/commandline/build/).
  
#### Run the Docker Container
```
docker run -p 4000:8080 -d icap-management-portal
```
  
<b>Note:</b> This will run the server in production-mode.  
This command runs the Docker container using the Docker image that was just built, [docker run](https://docs.docker.com/engine/reference/run/).  
The <b>-p</b> flag maps the exposed port 8080 to port 4000.  
  The <b>-d</b> flag runs the container in detached mode, which runs in the background.
