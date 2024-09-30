import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';

const Home = () => {
  const search = useSelector((state) => state.filter.value);
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [sortCategory, setSortCategory] = React.useState({
    name: 'популярности',
    sortName: 'rating',
  });
  const [page, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    setLoaded(false);
    const url = new URL(`https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas?page=${page}&limit=4`);
    url.searchParams.append('category', activeCategory > 0 ? activeCategory : '');
    url.searchParams.append('sortBy', sortCategory.sortName);
    url.searchParams.append('title', search);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoaded(true);
      });
  }, [activeCategory, sortCategory, search, page]);
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
      <Pagination
        onChangePage={(number) => {
          setCurrentPage(number);
        }}
      />
    </>
  );
};

export default Home;
