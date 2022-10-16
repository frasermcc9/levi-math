FROM node:18.7.0
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . /app/
RUN npm run build
EXPOSE 3000
CMD [ "node", "./dist/apps/backend/main.js"]