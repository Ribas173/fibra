# Dockerfile para servir site estático no Render
FROM nginx:alpine

# Copia todos os arquivos do diretório atual para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Exponha a porta 80 para tráfego HTTP
EXPOSE 80

# Comando padrão para manter o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
