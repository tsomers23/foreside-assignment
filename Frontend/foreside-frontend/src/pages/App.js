import { useEffect, useState } from 'react';
import './App.css';
import beerService from '../services/requestService';

function App() {
  const [beers, setBeers] = useState([])
  const [order, setOrder] = useState([])

  const addBeer = (id) => {
    setOrder(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeBeer = (id) => {
    setOrder(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  const sendOrder = () => {
    const orderArray = Object.entries(order)
      .map(([id, amount]) => ({
        id,
        amount
      }));

    beerService.sendOrder(orderArray)
      .then(response => {
        console.log(response.data);
        setOrder({});
      })
      .catch(error => {
        console.error("Order failed:", error);
      });
  };

  useEffect(() => {
    beerService.getAllBeers()
      .then(response => {
        console.log(response);
        setBeers(response.data);
      })
      .catch(error => {
        console.error("Error retrieving beers: " + error);
      });
  }, []);

  return (
    <div className="orderPage">
      <h1>Bierkeuze</h1>
      <ul className="beerList">
        {beers.map(beer => (
          <li key={beer.id} className="beerCard">
            <span className="beerName">{beer.name}</span>

            <div className="beerButtons">
              <button className="removeBeerButton" onClick={() => removeBeer(beer.id)}>-
              </button>

              <span className="amount">{order[beer.id] || 0}</span>

              <button className="addBeerButton" onClick={() => addBeer(beer.id)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="orderButton" onClick={sendOrder}>
        <span className="beerFill"></span>
        <span className="orderButtonText">BESTELLING PLAATSEN</span>
      </button>
    </div>
  );

}

export default App;
