import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectSort, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { Link, useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock, { PizzaBlockProps } from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { category, page, searchValue } = useSelector(selectFilter);

  const sortCategory = useSelector(selectSort);

  const getPizzas = async () => {
    const url = new URL(`https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas?page=${page}&limit=4`);
    url.searchParams.append('category', category > 0 ? category : '');

    url.searchParams.append('sortBy', sortCategory.sortName);
    url.searchParams.append('title', searchValue);

    // @ts-ignore
    dispatch(fetchPizzas(url));
    window.scrollTo({
      top: 20,
      left: 0,
      behavior: 'smooth',
    });
  };

  // номер страницы получаем
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
    getPizzas();
  }, [sortCategory, category, page, searchValue]);

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
    isMounted.current = true;
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error_info">
          Что то пошло не так кажется
          <h2>Может завтра?</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((pizza: PizzaBlockProps) => (
                <Link to={`pizza/${pizza.id}`} key={pizza.id}>
                  <PizzaBlock {...pizza} />
                </Link>
              ))}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
