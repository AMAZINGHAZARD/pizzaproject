
import { Link } from 'react-router-dom';
const cartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пустая<icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу
        </p>
        <img
          src='img/empty-cart.png'
          alt="Empty cart"
        />
        <Link
          class="button button--black"
          to="/"
        >
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default cartEmpty;
