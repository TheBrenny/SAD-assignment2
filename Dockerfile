# I don't actually know if this is fully correct - probably
#   isn't, but you get the gist.
# If you have NodeJS installed, it might be easier to just
#   run `node server.js`

FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 80
CMD [ "node", "server.js" ]