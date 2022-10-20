import { CartItem } from '../Redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce(
    (sum: number, obj: { price: number; count: number }) =>
      obj.price * obj.count + sum,
    0
  );
};
