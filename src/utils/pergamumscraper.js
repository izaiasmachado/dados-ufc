const { JSDOM } = require('jsdom')

module.exports = {
  pendencyList,
  reservationList
}

function pendencyList (html) {
  const data = []
  const { document } = (new JSDOM(html)).window
  const list = document.body.querySelector('ul').children

  if (list[1].innerHTML.trim() === 'N�o existe nenhum registro cadastrado.') return data

  for (let i = 1; i < list.length; i++) {
    const name = list[i].querySelector('h2').innerHTML.trim()
    const returnDate = list[i].querySelectorAll('p')[0].innerHTML.split('</strong>')[1].trim()
    const renewsNumber = list[i].querySelectorAll('p')[1].innerHTML.split('</strong>')[1].trim()

    data.push({
      name,
      returnDate,
      renewsNumber
    })
  }
  return data
}

function reservationList (html) {
  const data = []
  const { document } = (new JSDOM(html)).window
  const list = document.body.querySelector('ul').children

  if (list[1].innerHTML.trim() === 'N�o existe nenhum registro cadastrado.') return data

  for (let i = 1; i < list.length; i++) {
    const name = list[i].querySelector('h2').innerHTML.trim()
    const status = list[i].querySelectorAll('p')[0].innerHTML.split(':')[1].trim()

    data.push({
      name,
      status
    })
  }
  return data
}
