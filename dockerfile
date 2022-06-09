FROM node:17.9.1-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]