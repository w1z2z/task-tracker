FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]
