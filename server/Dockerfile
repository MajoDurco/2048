FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/src/index.js"]
