FROM node
WORKDIR /usr/src/app
COPY package.json index.ts .env ./
COPY routes ./routes
RUN npm i
CMD [ "npm", "start" ]