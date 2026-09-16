FROM ghost:6.62.0-alpine
COPY theme /opt/jikji-theme-source
COPY deploy/images/config.mjs deploy/images/prepare-theme.mjs deploy/images/healthcheck.mjs deploy/images/ghost-entrypoint.sh /opt/jikji/
COPY deploy/routes.yaml /opt/jikji/routes.yaml
RUN node /opt/jikji/prepare-theme.mjs /opt/jikji-theme-source /opt/jikji-theme \
    && chmod +x /opt/jikji/ghost-entrypoint.sh
ENV NODE_ENV=production
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=120s --retries=5 CMD ["node", "/opt/jikji/healthcheck.mjs"]
ENTRYPOINT ["/opt/jikji/ghost-entrypoint.sh"]
CMD ["node", "current/index.js"]
