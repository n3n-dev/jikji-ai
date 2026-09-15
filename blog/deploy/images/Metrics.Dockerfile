FROM node:24-alpine
WORKDIR /app
COPY services/views/server.mjs services/views/counter.mjs ./
RUN mkdir /data && chown node:node /data
USER node
ENV NODE_ENV=production VIEWS_DB=/data/counts.db
EXPOSE 2369
CMD ["node", "server.mjs"]
