FROM node:21-alpine3.18 as base

# Get frontend
FROM base as frontend
WORKDIR /usr/src/app
COPY front_end/package*.json .
RUN npm install
COPY  front_end .
RUN npm run build

# Get backend
FROM base as backend
WORKDIR /usr/src/app
COPY back_end/package*.json .
RUN npm install
COPY  back_end .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

# Final
FROM base as final
WORKDIR /usr/src/app
COPY --from=backend /usr/src/app/dist .
COPY --from=backend /usr/src/app/.env .
COPY --from=backend /usr/src/app/prisma ./prisma
COPY --from=frontend /usr/src/app/dist ./public

COPY --from=backend /usr/src/app/package*.json .
RUN npm install --only=production

RUN npx prisma db push --schema=./prisma/schema.prisma
EXPOSE 4000

CMD ["node", "server.js"]