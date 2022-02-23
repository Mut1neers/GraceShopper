import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import "../../style/singleproductpage.css";

const SingleProductPage = ({ products }) => {
  const history = useHistory();
  let { productId } = useParams();

  const product = products.find((product) => parseInt(productId) === product.id);

  return (
    <div  className='product-card'>
      {product ? (
        <div className='content'>
          <img src={product.imageurl} />
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <h4>{product.description}</h4>
        </div>
      ) : (
        <h2>product does not exist</h2>
      )}
    </div>
  );
};

export default SingleProductPage;
