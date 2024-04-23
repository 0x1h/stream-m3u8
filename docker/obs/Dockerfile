FROM node
WORKDIR /usr/src/app
COPY package.json package.json ./
COPY src ./src
COPY prisma ./prisma
RUN npm i && npx prisma generate
CMD [ "npm", "start" ]