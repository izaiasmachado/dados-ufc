<h1 align="center">Dados UFC</h1>

<p align="center">
  <a href="https://npm-stat.com/charts.html?package=dados-ufc">
    <img src="https://img.shields.io/npm/dm/dados-ufc.svg">
  </a>
  <a href="https://www.npmjs.com/package/dados-ufc">
    <img src="https://badge.fury.io/js/dados-ufc.svg">
  </a>
  <a href="https://snyk.io/test/github/izaiasmachado/dados-ufc">
    <img src="https://snyk.io/test/github/izaiasmachado/dados-ufc/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/izaiasmachado/dados-ufc" style="max-width:100%;">
  </a>
</p>

<p align="center">
  Busca de dados no site da Universidade Federal do Ceará
</p>

## O que é?
Basicamente um wrapper para busca de dados no [site da universidade](http://ufc.br).

Criei um módulo ao invés de uma api devido aos custos e possível latência, então qualquer um que se sinta apto a contribuir ou utilizar é bem vindo!

## Como usar?
Como é um scraper, existe uma latência considerável entre a requisição e a resposta do servidor, então usamos o modelo assíncrono (Promise-Based).

### Listando coleções de notícias
Para mostrar notícias de anos anteriores.
```js
const ufc = require('dados-ufc')

ufc.news.list()
    .then(console.log)
    // {
    //     data: [
    //       {
    //         id: 'noticias-ufctv',
    //         name: 'Notícias UFCTV',
    //         link: 'http://www.ufc.br/noticias/noticias-ufctv'
    //       },
    //       {
    //         id: 'noticias-de-2020',
    //         name: 'Notícias de 2020',
    //         link: 'http://www.ufc.br/noticias/noticias-de-2020'
    //       },
    //       {
    //         id: 'noticias-de-2019',
    //         name: 'Notícias de 2019',
    //         link: 'http://www.ufc.br/noticias/noticias-de-2019'
    //       },
    //       ... 8 more items
    //     ],
    //     size: 11
    // }
```

### Buscando notícias
Forma rápida de consultar as ultimas informações publicadas no [Portal de Notícias da UFC](http://www.ufc.br/noticias). Pode ser feita a busca por palavras específicas e ano, conforme o site linkado.

No exemplo a seguir, temos uma busca pela última notícia. A presença da data também é importante, pois podemos selecionar notícias somente do dia atual e realizar o processamento da forma que o desenvolvedor desejar.
```js
const ufc = require('dados-ufc')

ufc.news.show({ limit: 1 })
    .then(console.log)
    // {
    //     id: 'noticias-de-2020',
    //     news: {
    //         data: [{
    //             id: '15240-inscricoes-para-cursos-de-libras-e-esperanto-seguem-ate-esta-quarta-feira-25-exclusivamente-pela-internet',
    //             title: 'Inscrições para cursos de Libras e Esperanto seguem até esta quarta-feira (25) exclusivamente pela Internet',
    //             link: 'http://www.ufc.br/noticias/15240-inscricoes-para-cursos-de-libras-e-esperanto-seguem-ate-esta-quarta-feira-25-exclusivamente-pela-internet',
    //             date: '2020-11-24'
    //         }],
    //         size: 1
    //     },
    //     page: 0,
    //     size: 875,
    //     limit: 1,
    //     search: undefined
    // }
```

### Listando Calendários
Mostra a lista de Calendários Acadêmicos disponíveis no site.
```js
const ufc = require('dados-ufc')

ufc.calendar.list()
    .then(console.log)
    // {
    //     data: [
    //       {
    //         id: '2020-ajustes-apos-aprovacao-do-ppe',
    //         name: '2020 - ajustes após aprovação do PPE',
    //         link: 'http://www.ufc.br/calendario-universitario/2020-ajustes-apos-aprovacao-do-ppe'
    //       },
    //       {
    //         id: '2020',
    //         name: '2020',
    //         link: 'http://www.ufc.br/calendario-universitario/2020'
    //       },
    //       {
    //         id: '2019',
    //         name: '2019',
    //         link: 'http://www.ufc.br/calendario-universitario/2019'
    //       },
    //       ... 5 more items
    //     ],
    //     size: 8
    // }
```


### Eventos no calendário
Já essa função lista os eventos dentro do calendário.

O único filtro passível no momento é o de id. Exemplo `ufc.calendar.show({ id: '2020' })` (conforme o exemplo anterior). Se não for passado nada, será mostrado o último calendário.
```js
const ufc = require('dados-ufc')

ufc.calendar.show()
    .then(console.log)
    // {  
    //     id: '2020-ajustes-apos-aprovacao-do-ppe',
    //     events: {
    //       data: [{
    //           summary: 'Feriado Municipal em SOBRAL - Aniversário de Sobral',
    //           start: { dateTime: 2020-07-05T03:00:00.000Z },
    //           end: { dateTime: 2020-07-06T02:59:59.999Z }
    //         }
    //         ... 161 more items
    //       ],
    //       size: 162
    //     }
    // }
```

## Missão
Contribuir de forma positiva para o ambiente acadêmico e facilitar o acesso à informação.

## Como contribuir?
 - Basta fazer um fork desse projeto, faça suas alterações e então um pull request quando tudo estiver pronto.
 - Você também pode criar uma issue reportando algum problema ou função que gostaria de ver aqui nesse repositório.
 - Se o projeto for mantido, também será necessária documentação.
 - Ou também, outra forma é entrando em contato pelo email no meu perfil do Github e reportando sua experiência com essa aplicação.

## Contribuidores
Qualquer contribuidor será contemplado no arquivo README.md e além disso estará facilitando e muito a vida da comunidade acadêmica.


| [<img src="https://avatars1.githubusercontent.com/u/47263002?s=115&u=b023cb850aece85c91b28786cb6608cbded86065&v=4"><br><sub>@matheus3301</sub>](https://github.com/matheus3301) |
| :---: |

## Autor

| [<img src="https://avatars1.githubusercontent.com/u/47287096?s=115&u=90cfa870096b9740b7396f9bbe4c34f1a7007055&v=4"><br><sub>@izaiasmachado</sub>](https://github.com/izaiasmachado) |
| :---: |
