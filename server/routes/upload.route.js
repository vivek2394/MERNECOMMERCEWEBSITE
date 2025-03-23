import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import uploadImageController from "../controller/uploadImageController.js";

const uploadRoute=Router();

uploadRoute.post("/upload",auth,upload.single("image"),uploadImageController)


export default uploadRoute;