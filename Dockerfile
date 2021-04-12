FROM node:15.14.0

ENV backendURI="http://backend:50000"

COPY . /data/blotter_page

WORKDIR /data/blotter_page

ENTRYPOINT [ "yarn", "start"]