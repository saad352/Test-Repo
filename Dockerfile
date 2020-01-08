FROM alpine
RUN apk update && apk upgrade
RUN apk add nodejs npm

WORKDIR /usr/src/app
COPY package.json .
COPY . .
EXPOSE 1347	

CMD ["npm", "start"]