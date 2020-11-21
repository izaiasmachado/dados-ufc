const { JSDOM } = require('jsdom')
const striptags = require('striptags')
const ufc = require('../utils/ufc')
const { portuguesMonthsNumber } = require('../utils/scripts')

const url = '/calendario-universitario/'

async function list () {
  const data = []
  const { data: html } = await ufc.get(`${url}`)
  const { window: { lateral } } = new JSDOM(html)

  const items = lateral.getElementsByClassName('link')
  const size = (items.length) ? items.length - 1 : 0

  for (let i = 0; i < size; i++) {
    const item = items[i]
    const { innerHTML: name, href: link } = item
    const id = link.split(url)[1]

    data.push({ id, name, link })
  }

  return { data, size }
}

async function show (params) {
  const data = []
  const calendars = await list()
  const id = (params && params.id) ? params.id : calendars.data[0].id

  const { data: html } = await ufc.get(`${url}${id}`)
  const parsedHtml = html.trim()
  const { window: { main } } = new JSDOM(parsedHtml)

  const content = main.getElementsByClassName('c-calendarios item-page')[0]
  const monthAndYears = content.getElementsByTagName('h3')
  const stripes = content.getElementsByClassName('listras')

  for (let i = 0; i < stripes.length; i++) {
    const cells = stripes[i].getElementsByClassName('cell')

    for (let j = 0; j < cells.length; j += 2) {
      const monthAndYear = monthAndYears[i].innerHTML
      const rawDateStr = cells[j].innerHTML
      const rawEventName = cells[j + 1].innerHTML

      const name = striptags(rawEventName)
      const date = parseDate(monthAndYear, rawDateStr)

      data.push({ name, date })
    }
  }

  const size = data.length

  return {
    id,
    items: { data, size }
  }
}

function parseDate (monthAndYear, rawDateStr) {
  const dateStr = removeNotations(rawDateStr)
  const [month, year] = parseMonthAndYear(monthAndYear)
  const day = parseDateStr(dateStr)
  const date = parseToFullDate({ month, year, day })

  return date
}

function removeNotations (line) {
  const common = [' (PG)', ' (SP)', ' (EaD)', ' (EAD)', '*']
  common.forEach(word => {
    line = line.replace(`${word}`, '')
  })

  return line
}

function parseMonthAndYear (monthAndYear) {
  const parsedStr = monthAndYear.split(' de ')
  const month = portuguesMonthsNumber(parsedStr[0])
  const year = Number(parsedStr[1])

  return [month, year]
}

function parseDateStr (dateStr) {
  let day

  if (dateStr.indexOf(' a ') !== -1) {
    day = dateStr.split(' a ')
  } else if (dateStr.indexOf(' e ') !== -1) {
    day = dateStr.split(' e ')
  } else {
    day = dateStr
  }

  return (typeof day === 'object')
    ? [Number(day[0]), Number(day[1])]
    : Number(day)
}

function parseToFullDate ({ year, month, day }) {
  const start = new Date('0000-00-00')
  const end = new Date('0000-00-00')

  start.setMonth(month)
  start.setFullYear(year)

  end.setMonth(month)
  end.setFullYear(year)

  if (typeof day === 'number') {
    start.setDate(day)
    end.setDate(day)
  } else {
    start.setDate(day[0])
    end.setDate(day[1])
  }

  end.setDate(end.getDate() + 1)
  end.setMilliseconds(end.getMilliseconds() - 1)

  return { start, end }
}

module.exports = { list, show }
