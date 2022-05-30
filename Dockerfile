FROM node:16-alpine
WORKDIR /usr/src/app

RUN apk update
RUN apk --no-cache add git

RUN npm install -g nodemon

COPY ./package* ./

RUN npm install -i

CMD ["sleep", "infinity"]
