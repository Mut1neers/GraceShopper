import React from 'react';
import { SingleProduct } from '..';
import { AddShoppingCart } from '@material-ui/icons';
import { useParams, useHistory } from 'react-router-dom';

const SingleProductPage = ({ products }) => {
  const history = useHistory();
  let { productId } = useParams();

  const product = products.find((product) => parseInt(productId) === product.id);

  return (
    <div>
      {product ? (
        <div>
          <image src={product.image} />
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
        </div>
      ) : (
        <h2>product does not exist</h2>
      )}
    </div>
  );
};

export default SingleProductPage;
