const { JSDOM } = require('jsdom')

module.exports = {
  lateral,
  pagination,
  news,
  calendar
}

async function lateral (html, url) {
  const data = []
  const { window: { lateral } } = new JSDOM(html)

  const items = lateral.getElementsByClassName('link')
  const size = items.length

  for (let i = 0; i < size; i++) {
    const item = items[i]
    const { innerHTML: name, href: link } = item
    const id = link.split(url)[1]

    data.push({ id, name, link })
  }

  return data
}

async function pagination (html) {
  const { window: { conteudo } } = new JSDOM(html)
  const counter = conteudo.getElementsByClassName('counter')[0]
  if (!counter) return 1

  const text = counter.innerHTML
  return Number(text.split('de ')[1])
}

async function news (html) {
  const data = []
  const { window: { conteudo } } = new JSDOM(html)
  const stripes = conteudo.getElementsByClassName('listras')
  const items = stripes[0].getElementsByClassName('item')

  for (let i = 0; i < items.length; i++) {
    const { innerHTML: title, href: link } = items[i].getElementsByTagName('a')[0]
    const { innerHTML: date } = items[i].getElementsByClassName('list-date')[0]
    data.push({ title, link, date })
  }

  return data
}

async function calendar (html) {
  const data = []
  const { window: { main } } = new JSDOM(html)

  const monthAndYears = main.getElementsByTagName('h3')
  const stripes = main.getElementsByClassName('listras')

  for (let i = 0; i < stripes.length; i++) {
    const cells = stripes[i].getElementsByClassName('cell')

    for (let j = 0; j < cells.length; j += 2) {
      const monthAndYear = monthAndYears[i].innerHTML
      const rawDateStr = cells[j].innerHTML
      const rawEventName = cells[j + 1].innerHTML
      data.push({ monthAndYear, rawDateStr, rawEventName })
    }
  }

  return data
}
