FROM php:7.2-apache

# Set new document root
ENV APACHE_DOCUMENT_ROOT /var/www/museum

RUN apt-get update && apt-get install nano
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN  a2enmod headers && sed -ri -e 's/^([ \t]*)(<\/VirtualHost>)/\1\tHeader set Access-Control-Allow-Origin "*"\n\1\2/g' /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's/#LoadModule headers_module/LoadModule headers_module/' /etc/apache2/*/*.conf
RUN sed -ri -e 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /etc/apache2/*/*.conf

COPY ./ya.builder/icons/* /usr/share/apache2/icons

COPY ./ya.builder "${APACHE_DOCUMENT_ROOT}"
