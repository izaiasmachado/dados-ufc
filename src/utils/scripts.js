const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function portuguesMonthsNumber (month) {
  for (let i = 0; i < 12; i++) {
    if (month.indexOf(months[i]) !== -1) return i
  }
}

module.exports = { portuguesMonthsNumber }
