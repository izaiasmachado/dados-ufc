const ufc = require('../utils/ufc')
const scraper = require('../utils/scraper')
const url = '/noticias/'

module.exports = {
  list,
  show
}

async function list () {
  const { data: html } = await ufc.get(`${url}`)
  const data = await scraper.lateral(html, url)
  data.splice(-3)

  const size = data.length
  return {
    data,
    size
  }
}

async function show (params) {
  const collections = await list()
  const id = (params && params.id) ? params.id : collections.data[1].id
  const page = (params && params.page) ? params.page : 0
  const limit = (params && params.limit) ? params.limit : 20
  const search = (params && params.search) ? params.search : undefined
  const link = url + id

  const { data: html } = await ufc.get(link, {
    params: {
      start: page * limit,
      limit,
      'filter-search': search
    }
  })

  const rawNews = await scraper.news(html)
  const size = await scraper.pagination(html)
  const news = await parseNews(rawNews, url)
  return {
    id,
    news,
    page,
    size,
    limit,
    search
  }
}

async function parseNews (news, url) {
  const size = news.length
  const data = news.map(el => {
    return {
      id: el.link.split(url)[1],
      title: el.title,
      link: el.link,
      date: parseDate(el.date)
    }
  })

  return { data, size }
}

function parseDate (dateStr) {
  return `${dateStr.slice(6, 10)}-${dateStr.slice(3, 5)}-${dateStr.slice(0, 2)}`
}
