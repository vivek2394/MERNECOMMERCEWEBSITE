import { Router } from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController } from '../controller/order.controller.js';


const orderRoute = Router()


orderRoute.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
orderRoute.post('/checkout',auth,paymentController)
orderRoute.get("/order-list",auth,getOrderDetailsController)

export default orderRoute;