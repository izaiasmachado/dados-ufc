const { JSDOM } = require('jsdom')
const ufc = require('../utils/ufc')

async function news ({ year, page, limit, search }) {
  const url = '/noticias/'
  const date = new Date()

  if (!page) page = 0
  if (!year) year = date.getFullYear()

  const { data: html, status } = await ufc.get(`${url}/noticias-de-${year}`, {
    params: {
      start: page * limit,
      limit,
      'filter-search': search
    }
  })

  if (status !== 200) throw new Error(`Request to UFC Website failed with error ${status}`)
  const items = await getItems({ html, url })
  const size = await getPagination({ html })
  return { items, page, size, year, limit, search }
}

async function getItems ({ html, url }) {
  const data = []
  const { window: { conteudo } } = new JSDOM(html)
  const stripes = conteudo.getElementsByClassName('listras')
  if (stripes.length === 0) throw new Error('No news found')
  const items = stripes[0].getElementsByClassName('item')

  for (let i = 0; i < items.length; i++) {
    const { innerHTML: title, href: link } = items[i].getElementsByTagName('a')[0]
    const { innerHTML: date } = items[i].getElementsByClassName('list-date')[0]
    const id = link.split(url)[1]

    data.push({ id, title, link, date: await parseDate(date) })
  }

  const size = data.length
  return { data, size }
}

async function getPagination ({ html }) {
  const { window: { conteudo } } = new JSDOM(html)
  const counter = conteudo.getElementsByClassName('counter')[0]
  if (!counter) return 1

  const text = counter.innerHTML
  const size = Number(text.split('de ')[1])
  return size
}

async function parseDate (dateStr) {
  return `${dateStr.slice(6, 10)}-${dateStr.slice(3, 5)}-${dateStr.slice(0, 2)}`
}

module.exports = news
