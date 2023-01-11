# syntax=docker/dockerfile:experimental

FROM node:16.5.0 AS builder

COPY ./ /data/blotter_page

WORKDIR /data/blotter_page

RUN yarn install --frozen-lockfile
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:16.5.0 AS prod

ENV backendURI="http://backend:50000"
WORKDIR /data/blotter_page
ENTRYPOINT [ "yarn", "start" ]

# dev cache
COPY --from=builder /data/blotter_page/package.json /data/blotter_page/yarn.lock ./
COPY --from=builder /data/blotter_page/node_modules ./node_modules

COPY --from=builder /data/blotter_page/next.config.js ./
COPY --from=builder /data/blotter_page/.next ./.next