const { beers } = require("./beers.js");

function getAllBeers(call, callback) {
    console.log({ beers });
    callback(null, { beers });
}

function getBeer(call, callback) {
    const beer = beers.find(b => b.id === call.request.id);

    if (!beer) {
        return callback(new Error("No beer found"));
    }

    callback(null, beer);
}

module.exports = { getAllBeers, getBeer };