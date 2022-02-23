
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";



import useStyles from "./singleProductStyles";
import { callApi } from "../../api";


const SingleProduct = ({ product, cart, setCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h4">{product.price}</Typography>
        </div>
        <Typography variant="body2" color="textSecondary">

          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Link to={`/products/${product.id}`}>

          {" "}
          <button>Clik Here</button>{" "}
        </Link>
        <IconButton aria-label="Add to Cart">
          <AddShoppingCart
            onClick={() => {
              console.log(cart);
            }}
          />

        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SingleProduct;
