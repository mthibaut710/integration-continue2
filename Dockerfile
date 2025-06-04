FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["node", "index.js"]
