FROM node

COPY . /app

RUN cd /app

RUN npm install

CMD ["npm", "start"]