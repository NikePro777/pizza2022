import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzasBlock';
import Skeleton from './components/PizzasBlock/Skeleton';

function App() {
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch('https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {loaded
              ? items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)
              : [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
