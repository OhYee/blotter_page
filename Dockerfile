FROM node:16.5.0 AS builder

COPY ./ /data/blotter_page

WORKDIR /data/blotter_page

RUN yarn
RUN yarn build

FROM node:16.5.0 AS prod

ENV backendURI="http://backend:50000"

COPY --from=builder /data/blotter_page/.next /data/blotter_page/.next
# COPY --from=builder /data/blotter_page/node_modules /data/blotter_page/node_modules
COPY --from=builder /data/blotter_page/package.json /data/blotter_page/package.json
COPY --from=builder /data/blotter_page/yarn.lock /data/blotter_page/yarn.lock
COPY --from=builder /data/blotter_page/next.config.js /data/blotter_page/next.config.js

WORKDIR /data/blotter_page
RUN yarn --prod

ENTRYPOINT [ "yarn", "start" ]