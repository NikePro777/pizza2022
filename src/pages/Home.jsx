import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(0);

  React.useEffect(() => {
    fetch('https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoaded(true);
      });
  }, [activeCategory]);
  return (
    <>
      <div className="content__top">
        <Categories
          selectCategory={activeCategory}
          onChangeCategory={(i) => setActiveCategory(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loaded
          ? items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)
          : [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
      </div>
    </>
  );
};

export default Home;
