import { Router } from "express";

import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controller/subCategory.controller.js";
import auth from "../middleware/auth.js";


const subCategoryRoute = Router()

subCategoryRoute.post('/create',auth,AddSubCategoryController)
subCategoryRoute.get('/get',getSubCategoryController)
subCategoryRoute.put('/update',auth,updateSubCategoryController)
subCategoryRoute.delete('/delete',auth,deleteSubCategoryController)

export default subCategoryRoute;