import React from 'react';

import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const { search, category, page } = useSelector((state) => state.filter);
  const sortCategory = useSelector((state) => state.filter.sort);

  const fetchPizzas = () => {
    setLoaded(false);
    const url = new URL(`https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas?page=${page}&limit=4`);
    url.searchParams.append('category', category > 0 ? category : '');
    url.searchParams.append('sortBy', sortCategory.sortName);
    url.searchParams.append('title', search);
    axios.get(url).then((res) => {
      setItems(res.data);
      setLoaded(true);
    });
  };

  // номер страницы получаем
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    // получаем строку из параметров URL
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortCategory: sortCategory.sortName,
        page,
        category,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortCategory, page, category]);

  // при первом рендере, проверяем url параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortName === params.sortCategory);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [category, sortCategory, search, page]);

  return (
    <>
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
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
