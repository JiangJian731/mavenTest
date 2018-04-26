FROM skyrkt/nginx-node:latest

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY deploy/docker/nginx /etc/nginx

WORKDIR /app

COPY ./package.json /app/
RUN npm install

COPY . /app/

ARG APP_ENV

CMD npm run ${APP_ENV} && mkdir /usr/share/nginx/html/temperature && cp -r dist/* /usr/share/nginx/html/temperature && nginx -g 'daemon off;'
