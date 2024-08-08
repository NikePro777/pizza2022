import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [sortCategory, setSortCategory] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    const searchCategory = `category=${activeCategory > 0 ? activeCategory : ''}`;
    setLoaded(false);
    console.log(`https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas?${searchCategory}`);
    console.log(activeCategory, activeCategory > 0, searchCategory);
    const url = new URL('https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas');
    url.searchParams.append('category', activeCategory > 0 ? activeCategory : '');
    url.searchParams.append('sortBy', 'title');
    url.searchParams.append('order', 'desc');
    // fetch(`https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas?${searchCategory}`)
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoaded(true);
      });
  }, [activeCategory, sortCategory]);
  return (
    <>
      <div className="content__top">
        <Categories
          selectCategory={activeCategory}
          onChangeCategory={(i) => setActiveCategory(i)}
        />
        <Sort selectedSort={sortCategory} changeSelectedSort={(i) => setSortCategory(i)} />
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
