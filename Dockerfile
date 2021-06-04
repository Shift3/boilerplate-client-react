FROM node:14

# set the working directory
WORKDIR /app

# add node modules to the path
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# copy over the app
COPY . .

CMD yarn start