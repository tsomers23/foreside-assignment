const { beers } = require("./beers.js");

function getAllBeers(call, callback) {
    console.log({ beers });
    callback(null, { beers });
}

function getBeer(call, callback) {
    const beer = getBeerById(call.request.id);
    callback(null, { beer });
}


module.exports = { getAllBeers, getBeer };