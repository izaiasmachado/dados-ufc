const { JSDOM } = require('jsdom');

module.exports = {
    pendencyList,
    reservationList
};


function pendencyList(html) {
    data = [];
    const { document } = (new JSDOM(html)).window;

    const list = document.body.querySelector('ul').children;

    if (list[1].innerHTML.trim() == 'N�o existe nenhum registro cadastrado.')
        return data;

    for (let i = 1; i < list.length; i++) {
        let name = list[i].querySelector("h2").innerHTML.trim();
        let returnDate = list[i].querySelectorAll("p")[0].innerHTML.split("</strong>")[1].trim();
        let renewsNumber = list[i].querySelectorAll("p")[1].innerHTML.split("</strong>")[1].trim();

        data.push({
            name,
            returnDate,
            renewsNumber
        })
    }
    return data;
}

function reservationList(html) {
    data = [];
    const { document } = (new JSDOM(html)).window;

    const list = document.body.querySelector('ul').children;

    if (list[1].innerHTML.trim() == 'N�o existe nenhum registro cadastrado.')
        return data;

    for (let i = 1; i < list.length; i++) {
        let name = list[i].querySelector("h2").innerHTML.trim();
        let status = list[i].querySelectorAll("p")[0].innerHTML.split(":")[1].trim();

        data.push({
            name,
            status
        })
    }
    return data;
}