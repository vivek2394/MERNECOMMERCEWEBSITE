import { Router } from "express";
import { registerUserController, verifyEmailController ,loginController, logoutController, uploadAvatar, updateUserDetails, forgotPasswordController, verifyForgotPasswordOtp, resetpassword, refreshToken, userDetails} from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRoute=Router();
userRoute.post('/register',registerUserController)
userRoute.post('/verify-email',verifyEmailController)
userRoute.post('/login',loginController)
userRoute.get('/logout',auth,logoutController)
userRoute.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRoute.put('/update-user',auth,updateUserDetails)
userRoute.put('/forgot-password',forgotPasswordController)
userRoute.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRoute.put('/reset-password',resetpassword)
userRoute.post('/refresh-token',refreshToken)
userRoute.get('/user-details',auth,userDetails)
export default userRoute; 
 