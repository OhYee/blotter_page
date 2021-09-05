# syntax=docker/dockerfile:experimental

FROM node:16.5.0 AS builder

WORKDIR /data/blotter_page

# deps cache
COPY ./package.json ./yarn.lock ./
RUN yarn --global

# build code
COPY ./ /data/blotter_page
WORKDIR /data/blotter_page
RUN yarn --global && yarn build

FROM node:16.5.0 AS prod

ENV backendURI="http://backend:50000"

WORKDIR /data/blotter_page

# dev cache
COPY --from=builder /data/blotter_page/package.json /data/blotter_page/package.json
COPY --from=builder /data/blotter_page/yarn.lock /data/blotter_page/yarn.lock
RUN yarn --prod

COPY --from=builder /data/blotter_page/.next /data/blotter_page/.next
COPY --from=builder /data/blotter_page/next.config.js /data/blotter_page/next.config.js


ENTRYPOINT [ "yarn", "start" ]