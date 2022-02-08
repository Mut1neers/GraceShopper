//why is productsRouter not highlighted in index.js?
// Do we need to declare app as express?

const express = require("express");
const {getAllProducts,getProductById} = require ("../db")
const productsRouter = express.Router();
//productsRouter.get("/products");
productsRouter.use((req, res, next) =>{console.log("request being made /products");next()})

productsRouter.get("/", async (req, res, next) => {
    try { const products = await getAllProducts()
        res.send(products)

    }
    catch (error){
        next (error)

    }
})

productsRouter.get("/:productId", async (req, res, next) => {
    try { 
        const matchingProduct = await getProductById(req.params.productId)
        res.send(matchingProduct)

    }
    catch (error){
        next (error)

    }
})

module.exports = productsRouter;
