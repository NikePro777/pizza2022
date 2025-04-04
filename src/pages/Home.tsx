import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock, { PizzaBlockProps } from '../components/PizzasBlock';
import Skeleton from '../components/PizzasBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter, selectSort } from '../redux/filter/selectors';
import { setCurrentPage, setFilters } from '../redux/filter/slice';
import { FilterSliceState } from '../redux/filter/type';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { category, page, searchValue } = useSelector(selectFilter);

  const sortCategory = useSelector(selectSort);

  const getPizzas = async () => {
    const url = new URL(`https://66a87abee40d3aa6ff582e7d.mockapi.io/pizzas?page=${page}&limit=4`);
    url.searchParams.append('category', category > 0 ? category.toString() : '');
    url.searchParams.append('sortBy', sortCategory.sortName);
    url.searchParams.append('title', searchValue);

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
      const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;
      const sort = sortList.find((obj) => obj.sortName === params.sort?.name);

      dispatch(
        setFilters({
          searchValue: params.searchValue,
          page: params.page,
          category: params.category,
          sort: sort || sortList[0],
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
        <Sort value={sortCategory} />
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
            : items.map((pizza: PizzaBlockProps) => <PizzaBlock {...pizza} key={pizza.id} />)}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </>
  );
});

export default Home;
