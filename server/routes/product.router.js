import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controller/product.controller.js'
import { admin } from '../middleware/admin.js'
const productRoute = Router()

productRoute.post("/create",auth,admin,createProductController);
productRoute.post('/get',getProductController)
productRoute.post("/get-product-by-category",getProductByCategory)
productRoute.post('/get-product-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRoute.post('/get-product-details',getProductDetails)

//update product
productRoute.put('/update-product-details',auth,admin,updateProductDetails)

//delete product
productRoute.delete('/delete-product',auth,admin,deleteProductDetails)

//search product 
productRoute.post('/search-product',searchProduct)

export default productRoute;