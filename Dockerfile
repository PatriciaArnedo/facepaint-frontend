FROM node:14.13-buster as build

RUN npm install -g serve

WORKDIR  /app

RUN npm i react-scripts

RUN npm i https://github.com/jeeliz/jeelizFaceFilter/tarball/master

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_BASE_URL="https://facepaint-backend-mad3zevtda-ue.a.run.app"

RUN npm run build

CMD serve --single --no-clipboard -l tcp://0.0.0.0:8080 -s build
