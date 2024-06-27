import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import pizzasItems from './assets/pizzas.json';
function App() {
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
            {pizzasItems.map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                price={pizza.price}
                title={pizza.title}
                imageUrl={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
