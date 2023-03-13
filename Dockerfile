FROM node:16 as base

WORKDIR /app

COPY *.json ./

RUN npm i

COPY ./src ./src