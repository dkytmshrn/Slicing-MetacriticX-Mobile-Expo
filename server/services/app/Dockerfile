FROM node:18.18

WORKDIR /usr/local/app

ENV JWT_SECRET=fortisimo

ENV PORT=4002

COPY package.json package-lock.json /usr/local/app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD [ "npm", "run", "start" ]