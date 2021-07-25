FROM node:latest
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 4001
CMD ["npm", "run", "production"]