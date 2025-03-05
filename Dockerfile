FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --unsafe-perm

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
