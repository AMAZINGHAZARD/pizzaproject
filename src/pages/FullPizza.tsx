import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './FullPizza.module.scss'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    text: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://6337038b65d1e8ef26785152.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при запросе пицц с id');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img
      className={styles.image}
        src={pizza.imageUrl}
      />
      <div className={styles.text}>
        <h1>{pizza.title}</h1>
        <p>{pizza.text}</p>
        <h4>{pizza.price} UAH</h4>
      </div>
      <div className="ml-50px cart__bottom-buttons">
        <div className={styles.backspace}>
          <Link
            to="/"
            className="button button--outline  go-back-btn"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            <span>Вернуться назад</span>
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
export default FullPizza;
