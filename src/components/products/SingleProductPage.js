import React from 'react'; 
import { SingleProduct } from '..';
import { AddShoppingCart } from '@material-ui/icons';
import { useParams, useHistory } from 'react-router-dom';

const SingleProductPage = ({products}) => {
    const history = useHistory()
    let {productId} = useParams()
   
    console.log("productId", productId) 
    const product = products.find((product) => parseInt(productId) === product.id )
    


    console.log("product",product)

    return(
        <div>{product ? (
            <h2>{product.name}</h2>

        ):(
            <h2>product does not exist</h2>
        )}</div>
    )
}




export default SingleProductPage 