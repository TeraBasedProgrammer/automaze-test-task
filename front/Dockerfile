FROM node:18

WORKDIR /next_app
COPY ./front/package*.json ./
RUN npm i
COPY ./front .
EXPOSE 3000
CMD npm run dev