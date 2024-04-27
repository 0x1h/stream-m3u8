FROM node
WORKDIR /usr/src/app
EXPOSE 8000
COPY package.json ./
COPY src ./src
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
CMD [ "npm", "start" ]