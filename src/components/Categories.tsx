import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/filter/slice';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const selectCategory = useSelector((state: any) => state.filter.category);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategory(index))}
            className={index === selectCategory ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
