FROM php:8.1-apache

Ativa mod_rewrite (se for usar .htaccess),
RUN a2enmod rewrite

Copia os arquivos do seu site pro diretório do Apache,
COPY . /var/www/html/

Dá permissão pros arquivos,
RUN chown -R www-data:www-data /var/www/html

Expondo a porta 80 pro Render,
EXPOSE 80
