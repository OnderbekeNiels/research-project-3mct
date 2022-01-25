FROM node:16.9.1-alpine as build-container

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY . .

RUN npm run build

FROM node:16.9.1-alpine As production-container

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci --only=production

COPY --from=build-container /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]