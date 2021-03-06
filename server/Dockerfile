FROM mongo
WORKDIR /usr/src/app
RUN apt-get update -y
RUN apt-get install apt-transport-https curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install nodejs -y
RUN node -v
RUN npm -v
RUN nodejs --version
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install yarn -y
COPY server/package*.json ./
COPY server/yarn.lock ./
COPY server/src ./src
COPY .env ./.env
RUN yarn global add typescript
COPY server/tsconfig.json ./
RUN yarn
RUN tsc -p .
ARG SERVER_PORT=${SERVER_PORT}
ARG PORT=${SERVER_PORT}
EXPOSE ${SERVER_PORT}
CMD ["node", "dist/server.js", "-d"]
