FROM nginx
ENV  AUTHOR=Docker

WORKDIR /usr/share/nginx/html
ADD assets.tar.gz /usr/share/nginx/html
COPY nginx /etc/nginx
CMD nginx -g 'daemon off;'
