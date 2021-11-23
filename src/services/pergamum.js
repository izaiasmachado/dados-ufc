const pergamum = require("../utils/pergamum");
const { pendencyList, reservationList } = require("../utils/pergamumscraper");
const url = "/login.php";

module.exports = {
    reservations,
    pendencies
}

async function request(login, password, flag) {
    //make a initial request just to get the PHPSESSID cookie, then make the real request
    let cookies;
    {
        const data = await pergamum.get(`/`);
        cookies = data.headers['set-cookie'][0].split(';')[0];
    }


    const options = {
        headers: {
            "Referer": "https://pergamum.ufc.br/pergamum/mobile/login.php?flag=renovacao.php",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": cookies
        },
    }

    const response = await pergamum.post(`${url}`, new URLSearchParams({
        flag,
        login,
        password,
        button: "Access",
        ifsp_categ: ""
    }), options);

    if (response.request.res.responseUrl == 'https://pergamum.ufc.br/pergamum/mobile/login.php') {
        throw new Error("Invalid credentials");
    }

    return response.data;
}

async function reservations(login, password) {
    const html = await request(login, password, 'minhas_reservas.php');
    const reservations = reservationList(html);
    return reservations;
}

async function pendencies(login, password) {
    const html = await request(login, password, 'renovacao.php');
    const pendencies = pendencyList(html);
    return pendencies;
}