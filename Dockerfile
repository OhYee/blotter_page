# syntax=docker/dockerfile:experimental

FROM node:16.5.0 AS deps

WORKDIR /data/blotter_page
RUN echo "1"

# deps cache
COPY ./package.json ./yarn.lock ./
RUN echo "2"
RUN yarn install --frozen-lockfile
RUN echo "3"

FROM node:16.5.0 AS builder

WORKDIR /data/blotter_page
RUN echo "4"

# build code
COPY . .
# COPY ./ /data/blotter_page
RUN echo "5"
COPY --from=deps /data/blotter_page/node_modules ./node_modules
RUN echo "6"
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
RUN echo "7"


FROM node:16.5.0 AS prod_deps

WORKDIR /data/blotter_page
RUN echo "8"

# deps cache
COPY ./package.json ./yarn.lock ./
RUN echo "9"
RUN yarn install --frozen-lockfile --prod
RUN echo "10"

FROM node:16.5.0 AS prod

ENV backendURI="http://backend:50000"
RUN echo "11"
WORKDIR /data/blotter_page
RUN echo "12"
ENTRYPOINT [ "yarn", "start" ]
RUN echo "13"

# dev cache
COPY --from=prod_deps /data/blotter_page/package.json /data/blotter_page/yarn.lock ./
RUN echo "14"
COPY --from=prod_deps /data/blotter_page/node_modules ./node_modules
RUN echo "15"

COPY --from=builder /data/blotter_page/next.config.js ./
RUN echo "16"
COPY --from=builder /data/blotter_page/.next ./.next
RUN echo "17"