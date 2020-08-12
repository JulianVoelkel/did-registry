# base image
FROM node:12

# set path for global dependencies in non-root user directory
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# set working directory
WORKDIR /did-registry

# add `/app/node_modules/.bin` to $PATH
ENV PATH /did-registry/node_modules/.bin:$PATH

# expose port 
EXPOSE 4400

# install and cache app dependencies
COPY package.json .

# install dependencies
RUN npm install 

# add app
COPY . /did-registry

# start app
CMD npm run docker