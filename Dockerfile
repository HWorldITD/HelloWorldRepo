FROM node:16

RUN mkdir -p /usr/src/react-app
WORKDIR /usr/src/react-app

COPY . /usr/src/react-app/
RUN yarn install

RUN mkdir /scripts
RUN echo 'npx json-server --watch MOCK_DATA.json --port 3000 --host 0.0.0.0 &' >> /scripts/init.sh
RUN echo 'yarn start' >> /scripts/init.sh

EXPOSE 3000
EXPOSE 3001

CMD sh -c "sh /scripts/init.sh"