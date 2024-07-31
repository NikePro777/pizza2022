import styles from './NotFoundBlock.module.scss';
import { Link } from 'react-router-dom';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br /> Ничего не найдено
      </h1>
      <p>Такой страницы нету, представляешь?</p>
      <button>
        <Link to="/">На главную</Link>
      </button>
    </div>
  );
};

export default NotFoundBlock;
