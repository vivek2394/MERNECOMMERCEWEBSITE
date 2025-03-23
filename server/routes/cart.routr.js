
import auth from "../middleware/auth.js";
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from "../controller/cart.controller.js";
import { Router } from "express";


const cartRoute = Router()

cartRoute.post('/create',auth,addToCartItemController)
cartRoute.get("/get",auth,getCartItemController)
cartRoute.put('/update-qty',auth,updateCartItemQtyController)
cartRoute.delete('/delete-cart-item',auth,deleteCartItemQtyController)
export default cartRoute;