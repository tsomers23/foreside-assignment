const express = require("express");
const cors = require("cors");

const beerClient = require("./beerClient");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/beers", (req, res) => {
    beerClient.GetAllBeers({}, (err, response) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Beer service unavailable");
        }

        res.json(response.beers);
    });
});

app.listen(4000, () => {
    console.log("🚪 API Gateway running on port 4000");
});
