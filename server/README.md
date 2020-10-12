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
docker build --tag icap-management-portal:version -f server/Dockerfile .
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

<hr/>

### Running the Server in Minikube
#### Make sure you're in the root directory of the project and Docker is running.

#### Prerequisites
- kubectl + Minikube

#### Start a Minikube cluster
```
minikube start
```

If Minikube installed correctly, you should see a cluster spin up in the Docker Desktop dashboard.

#### Add the Helm Chart to the Cluster
```
helm install icap-management-portal ./kube
```
Deploys a helm chart to the default namespace using the chart in ./kube.Chart.yaml and the values in ./kube/values.yaml. The deployment and service yaml files from /kube/template will be applied to the cluster automatically.

#### Verify the Pod(s) are Spinning Up
```
kubectl get pods --watch
```
The pod icap-management-portal should be spinning up after the helm install, the --watch flag will show any changes in the status. The status should change from ContainerCreating to Running.

#### Start the Service and Tunnel in to the Minikube Cluster (Windows)
```
minikube service icap-management-portal-service
```
Runs the service, exposing the icap-management-portal container. Minikube should automatically tunnel into the service, and a browser window should pop up with the app running on a random port. If the browser window doesn't open, the IP and port of the running service should be displayed on the command output.