import { CartItem } from '../Redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLs = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items:items as CartItem[],
    totalPrice,
  };
};
