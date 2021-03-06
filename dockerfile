FROM node:17.8-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]