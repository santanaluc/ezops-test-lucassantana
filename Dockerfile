FROM node:16 AS builder

# Variável de ambiente pra não ficar repetindo várias vezes
ENV HOME=/usr/src/app

# Quando copia somente esses dois ele vê se precisa dar npm install ou não
COPY ./package.json ./package-lock.json $HOME/node_docker/

WORKDIR $HOME/node_docker
 #--silent --progress=false
RUN npm install
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]
