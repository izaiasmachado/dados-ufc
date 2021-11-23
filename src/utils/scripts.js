const FormData = require("form-data");

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

module.exports = { portugueseMonthsNumber, createFormData }

function portugueseMonthsNumber (month) {
  for (let i = 0; i < 12; i++) {
    if (month.indexOf(months[i]) !== -1) return i
  }
}

function createFormData(flag,login,password,button,ifsp_categ){
  const formData = new FormData();

  formData.append('flag',flag);
  formData.append('login',login);
  formData.append('password',password);
  formData.append('button',button);
  formData.append('ifsp_categ',ifsp_categ);

  return formData;
}
