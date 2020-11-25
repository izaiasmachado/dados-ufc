const striptags = require('striptags')

const ufc = require('../utils/ufc')
const scraper = require('../utils/scraper')
const { portugueseMonthsNumber } = require('../utils/scripts')
const url = '/calendario-universitario/'

module.exports = {
  list,
  show
}

async function list () {
  const { data: html } = await ufc.get(`${url}`)
  const data = await scraper.lateral(html, url)
  data.pop()

  const size = data.length
  return {
    data,
    size
  }
}

async function show (params) {
  const calendars = await list()
  const id = (params && params.id) ? params.id : calendars.data[0].id
  const link = url + id

  const { data: html } = await ufc.get(link)
  const parsedHtml = html.trim()

  const rawEvents = await scraper.calendar(parsedHtml)
  const data = await parseEvents(rawEvents)
  const size = data.length

  return {
    id,
    events: {
      data,
      size
    }
  }
}

async function parseEvents (events) {
  return events.map(el => {
    const { monthAndYear, rawDateStr, rawEventName } = el
    return {
      name: striptags(rawEventName),
      date: parseDate(monthAndYear, rawDateStr)
    }
  })
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
  const month = portugueseMonthsNumber(parsedStr[0])
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
