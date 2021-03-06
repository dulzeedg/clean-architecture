/*
 * selectors let us take advantage of simple caching ('memoization').
 * More info: https://github.com/reactjs/reselect
*/

import { createSelector } from 'reselect';
import { formatProductList } from 'product-list/use-cases';
import CcSpinner from 'spinner';

export { selectProductListProps, selectProducts };

function selectProductListProps() {
  return createSelector(
    selectSpinner(),
    selectProducts,
    (spinner, products) => ({
      spinner,
      products: formatProductList(products),
    })
  );
}

function selectSpinner() {
  return createSelector(
          selectProducts,
          (products) => ((products.length === 0) ? new CcSpinner() : null)
        );
}

function selectProducts(state) {
  return state.toJS().productList ? state.toJS().productList.products : [];
}
