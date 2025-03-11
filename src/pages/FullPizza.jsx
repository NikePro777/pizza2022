import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('ошибка');
      }
    }
    fetchPizza();
  }, [id]);
  if (!pizza) return 'Загрузка...';
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
