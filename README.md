# Hello Squid (teste técnico)

[Aplicação no Heroku!!!](https://hellosquid.herokuapp.com/)

## LOCAL SETUP

* colonar ou baixar esse repo.
* instalar todas as dependências -> `npm install`
* rodar os servidores  `npm run dev`

node/express vai rodar no port 5000
react vai rodar no port 3000

se vocês quiserem usar a versão estática do React é preciso dar build antes.

* ir até a pasta do react `cd app/client`
* rodar o build `npm run build`

## ENVIRONMENT VARIABLES
Não publiquei nesse git o meu access token para consultar a API do Instagram.
Para configurar é só:
* criar um arquivo o nome .env na pasta root
* adicionar INSTAGRAM_ACCESS_TOKEN=<SEUTOKEN>

## TESTES

`npm run test-api` para testa a API (mocha + chai)

## AVISO
A API está fazendo buscas no meu perfil do instagram.
Só as tags 'hellosquid', 'dog', 'natal' e 'teste' vão retornar resultados.
