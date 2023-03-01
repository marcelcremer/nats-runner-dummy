FROM node:18
WORKDIR /app
ADD . /app
CMD node index.js