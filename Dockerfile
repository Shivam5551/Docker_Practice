FROM node:18-alpine

# Create app directory

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . ./

CMD [ "npm", "run", "dev" ]