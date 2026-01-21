const express = require("express");
const cors = require("cors");

const beerClient = require("./beerClient");
const orderClient = require("./orderClient");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/beers", (req, res) => {
    beerClient.GetAllBeers({}, (error, response) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(response.beers);
    });
});


app.post("/orders", (req, res) => {
    const order = req.body;
    console.log(order);

    orderClient.SendOrder({ order }, (error, response) => {
        if (error) {
            return res.status(500).send(error);
        }

        res.json(response);
    });
});


app.listen(4000, () => {
    console.log("API Gateway running on 4000")
});
