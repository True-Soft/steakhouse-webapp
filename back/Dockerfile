FROM node:14

ARG PORT=3000

ENV EXPOSE_PORT=$PORT

WORKDIR /usr/app

COPY ./package*.json ./backend/

RUN npm install --quiet --prefix ./backend

COPY . backend/

EXPOSE $EXPOSE_PORT

CMD ["npm" , "start" , "--prefix", "./backend"]
