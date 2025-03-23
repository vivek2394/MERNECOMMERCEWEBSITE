import { Router } from 'express'
import auth from '../middleware/auth.js';
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from '../controller/address.controller.js';

const addressRoute = Router()

addressRoute.post('/create',auth,addAddressController)
addressRoute.get("/get",auth,getAddressController)
addressRoute.put('/update',auth,updateAddressController)
addressRoute.delete("/disable",auth,deleteAddresscontroller)

export default addressRoute;