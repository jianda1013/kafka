FROM node:16-alpine

ARG DEFAULT_PATH
WORKDIR ${DEFAULT_PATH}

RUN apk update
RUN apk --no-cache add git

RUN npm install -g nodemon

COPY ./package* ./

RUN npm install -i

CMD ["npm", "start"]
