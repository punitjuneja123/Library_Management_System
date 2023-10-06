# Base Image for the Backend Node.js Application Docker image
FROM node:18-alpine
# Nodememon for monitoring and watching the Backend Node.js Application container
RUN npm install -g nodemon
# The working directory (folder) for the Backend Node.js Application container
WORKDIR /usr/src/app
# Copying the dependencies files for the Backend Node.js Application folder
COPY package.json .
#Installing all the dependencies/framework/libraries for the Backend Node.js Application
RUN npm install
#Copying all the Backend Node.js Application files to the container working directory
COPY . .
#Backend Node.js Application container will run on this port
EXPOSE 4500
#Command to start the Backend Node.js Application Docker container
CMD ["npm", "run", "server"]