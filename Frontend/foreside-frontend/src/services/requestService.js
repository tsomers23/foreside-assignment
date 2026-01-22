import http from "./htpp-common";

const getAllBeers = () => {
    return http.get("/beers");
};

const sendOrder = (order) => {
    return http.post("/orders", order);
};

const requestService = {
    getAllBeers,
    sendOrder
};



export default requestService;
