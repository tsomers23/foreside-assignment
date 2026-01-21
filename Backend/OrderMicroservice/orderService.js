const beerClient = require("./beerClient");

function sendOrder(call, callback) {
    const order = call.request.items;

    const bartenders = 3;

    order.forEach(beerObject => {
        beerClient.GetBeer({ id: beerObject.id }, (err, beer) => {

            const timePerBeer =
                beer.bartender_preparation_time + beer.pour_time;

            const totalPrepTime = timePerBeer * item.amount;
        });
    });
}