import React, {useState} from 'react';
import { Grid }  from '@material-ui/core';
import { SingleProduct } from '..';
import { Link, useHistory, useParams } from "react-router-dom";



const searchedProducts = (product, searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const {
      price,
      category,
      title,
      description,
  
    } = product;
  
    const toMatch = [description, category, title, price];
  
    for (const field of toMatch) {
      if (field.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }
    }
  }

 const Products = ({products}) => {


      const [searchTerm, setSearchTerm] = useState('')
      const history = useHistory();
      const productsToDisplay = products.filter((product) => searchedProducts(product, searchTerm));
    


  return ( 
   <main>
       <div className='title'>Browse Through Tons of Fake NFTS</div>
        
        <Grid container justify='center' spacing={4}>
            {products.map((product) => {
                return (
                    <Link to={`/products/:productId`}> 
                    <SingleProduct 

                        key={product.id}
                        product={product}
                    /></Link>
                    
                )
            
            })}
        </Grid>
    </main>
  )
}

export default Products