
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    text: string;
  };
  
  export interface PizzasSliceState {
    items: Pizza[];
    status: Status;
  }
