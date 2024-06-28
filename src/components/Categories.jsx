import React from 'react';
function Categories() {
  const categoryes = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeCategory, setActiveCategory] = React.useState(0);
  return (
    <div className="categories">
      <ul>
        {categoryes.map((category, index) => (
          <li
            key={index}
            onClick={() => setActiveCategory(index)}
            className={index === activeCategory ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
