import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Pagination from '../components/Pagination/Pagination';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';
import { SearchContext } from '../App';
import { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../Redux/slices/filterSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://6337038b65d1e8ef26785152.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };
  // Если изменили параметры и был первый рендер 
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, currentPage]);

  //

  const pizzas = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      {...obj}
    />
  ));
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={(i) => onChangeCategory(i)}
          value={categoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};
