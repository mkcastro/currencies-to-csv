const axios = require("axios");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
require("dotenv").config();

const today = new Date();
const past = new Date();

past.setDate(past.getDate() - 4);

console.log(today);
console.log(past);

const getDatesBetween = (start, end) => {
    let arr = new Array();
    let dt = new Date(start);
    while (dt <= end) {
        let temp = new Date(dt);

        let dd = String(temp.getDate()).padStart(2, "0");
        let mm = String(temp.getMonth() + 1).padStart(2, "0"); // January is 0!
        let yyyy = temp.getFullYear();

        arr.push(`${yyyy}-${mm}-${dd}`);
        dt.setDate(dt.getDate() + 1);
    }

    return arr;
};

const dates = getDatesBetween(past, today);

async function getDayCurrencies(date) {
    url =
        "http://api.exchangeratesapi.io/v1/" +
        date +
        "?access_key=" +
        process.env.ACCESS_KEY +
        "&base=" +
        process.env.BASE +
        "&symbols=" +
        process.env.SYMBOLS;

    // http://api.exchangeratesapi.io/v1/
    // YYYY-MM-DD
    // ? access_key = YOUR_ACCESS_KEY
    // & base = JPY
    // & symbols = USD,AUD,CAD,PLN,MXN

    console.log(url);

    return axios.get(url);
}

const requests = [];

for (let i = 0; i < dates.length; i++) {
    requests.push(getDayCurrencies(dates[i]));
}

const data = [];

axios
    .all(requests)
    .then((responses) => {
        responses.map((response) => {
            data.push({
                date: response.data.date,
                eur: response.data.rates.EUR,
                usd: response.data.rates.USD,
                aud: response.data.rates.AUD,
            });
        });

        return data;
    })
    .then((data) => {
        console.log(data);

        const csvWriter = createCsvWriter({
            path: "out.csv",
            header: [
                { id: "date", title: "Date" },
                { id: "eur", title: "EUR" },
                { id: "usd", title: "USD" },
                { id: "aud", title: "AUD" },
            ],
        });

        csvWriter
            .writeRecords(data)
            .then(() => console.log("The CSV file was written successfully"));
    });
