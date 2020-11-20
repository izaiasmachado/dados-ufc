<h1 align="center">Dados UFC</h1>
<p align="center">
  Busca de dados no site da universidade
</p>

## O que é?
Basicamente um wrapper para busca de dados no [site da universidade](http://ufc.br).

Criei um módulo ao invés de uma api devido aos custos e possível latência, então qualquer um que se sinta apto a contribuir ou utilizar é bem vindo!

## Como usar?
Como é um scraper, existe uma latência considerável entre a requisição e a resposta do servidor, então usamos o modelo assíncrono (Promise-Based).

### Buscando notícias
Forma rápida de consultar as ultimas informações publicadas no [Portal de Notícias da UFC](http://www.ufc.br/noticias). Pode ser feita a busca por palavras específicas e ano, conforme o site linkado.

No exemplo a seguir, temos uma busca pela última notícia. A presença da data também é importante, pois podemos selecionar notícias somente do dia atual e realizar o processamento da forma que o desenvolvedor desejar.
```js
const ufc = require('dados-ufc')

ufc.news({ 
    year: undefined, 
    page: undefined, 
    limit: 1, 
    search: undefined 
})
    .then(dados => console.log(dados))
    // {
    //     items: {
    //         data: [{
    //             id: '15223-ufc-tem-14-professores-entre-os-cientistas-mais-influentes-do-mundo-mostra-estudo-publicado-em-revista-internacional',
    //             title: 'UFC tem 14 professores entre os cientistas mais influentes do mundo, mostra estudo publicado em revista internacional',
    //             link: 'http://www.ufc.br/noticias/15223-ufc-tem-14-professores-entre-os-cientistas-mais-influentes-do-mundo-mostra-estudo-publicado-em-revista-internacional',
    //             date: '2020-11-19'
    //         }],
    //         size: 1
    //     },
    //     page: 0,
    //     size: 862,
    //     year: 2020,
    //     limit: 1,
    //     search: undefined
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

## Autor

| [<img src="https://avatars1.githubusercontent.com/u/47287096?s=115&u=90cfa870096b9740b7396f9bbe4c34f1a7007055&v=4"><br><sub>@izaiasmachado</sub>](https://github.com/izaiasmachado) |
| :---: |
