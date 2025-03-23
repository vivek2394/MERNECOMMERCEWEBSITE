import { Router } from "express";
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controller/category.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const categoryRoute=Router();

categoryRoute.post('/add-category', auth, AddCategoryController) // Requires auth
categoryRoute.get('/get', getCategoryController) //  Public Access
categoryRoute.put('/update', auth, updateCategoryController) // Requires auth
categoryRoute.delete("/delete", auth, deleteCategoryController) // Requires auth


export default categoryRoute;