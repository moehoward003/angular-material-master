# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent --legacy-peer-deps && mv node_modules ../
# COPY . .
# EXPOSE 4201
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
EXPOSE 4201
RUN npm install --legacy-peer-deps
#RUN npm run build --prod
#RUN npm run build -- --prod --omit=dev
RUN ./node_modules/.bin/ng build --configuration=production
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular-material-tutorial /usr/share/nginx/html
