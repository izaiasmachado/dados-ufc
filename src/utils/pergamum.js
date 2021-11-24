const axios = require('axios')
module.exports = axios.create({
  baseURL: 'https://pergamum.ufc.br/pergamum/mobile',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true
})
