import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import "../../style/singleproductpage.css";

const SingleProductPage = ({ products, cart, setCart, addToCart }) => {
  const history = useHistory();
  let { productId } = useParams();

  const product = products.find((product) => parseInt(productId) === product.id);

    return(
        <div>
            {product ? (
            <div>
               <image src={product.imageurl}/>
               <h2>{product.name}</h2>  
               <h3>{product.price}</h3>
               <button onClick={addToCart}>Add to Cart</button>
           
           </div>
            ):(
                <h2>product does not exist</h2>
            )}
        </div>
    )
        
}



export default SingleProductPage 
