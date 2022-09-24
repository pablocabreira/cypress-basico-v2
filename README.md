# cypress-basico-v2

Este é um projeto utilizado para a realização do curso da escola online Talking About Testing.

## Pré-requisitos

Para executar o projeto é necessário ter instalado o NodeJS, NPM e Cypress.

> As versões que eu utilizei foram:
> - NodeJS v16.17.0
> - NPM v8.15.0
> - Cypress v9.5.1

## Instalação

Executar o comando `npm install` (ou `npm i` para a versão curta) para instalar as dev dependencies.

## Testes

É possível rodar os testes simulando a resolução de tela de desktop ou dispositivos móveis (smartphone, por exemplo).

### Desktop

Executar `npm test` (ou `npm t` versão curta) para rodar os testes no modo headless.

Ou executar `npm run cy:open` para abrir o Cypress no modo interativo.

### Dispositivos móveis

Executar `npm test:mobile` para rodar os testes no modo headless.

Ou executar `npm run cy:open:mobile` para abrir o Cypress no modo interativo.