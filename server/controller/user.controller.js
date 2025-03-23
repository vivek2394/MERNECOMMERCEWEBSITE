import sendEmail from "../Config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import genertedRefreshToken from "../utils/genertedRefreshToken.js";
import uploadImageClodinary from '../utils/uploadImageClodinary.js'
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from e-commerce",
      html: verifyEmailTemplate({ name, url: VerifyEmailUrl }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Verify email done",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }
     
    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);
       
    const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
      last_login_date : new Date()
  })
    // send token in user cookies
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None", // because frontend backend are in diff domain
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(req, res) {
  try {
    const userid = req.userId; //middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    // remove from database
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetails(req,res){
  try {
      const userId  = req.userId

      console.log(userId)

      const user = await UserModel.findById(userId).select('-password -refresh_token')

      return res.json({
          message : 'user details',
          data : user,
          error : false,
          success : true
      })
  } catch (error) {
      return res.status(500).json({
          message : "Something is wrong",
          error : true,
          success : false
      })
  }
}
export async  function uploadAvatar(req,res){
try {
    const userId = req.userId
    const image=req.file;
    const upload =await uploadImageClodinary(image);
        
    const updateUser = await UserModel.findByIdAndUpdate(userId,{
        avatar : upload.url
    })
    return res.json({
        message : "profile updated..",
        success : true, 
        error : false,
        data : {
            _id : userId,
            avatar : upload.url
        }
    })

} catch (error) {
    return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
}
}

export async function updateUserDetails(req,res){
 try {
    
    const userId = req.userId; //auth middleware
    const { name, email, mobile, password } = req.body;
     // convert pass to hashed pass 
    let hashPassword = ""
    if(password){
        const salt = await bcryptjs.genSalt(10)
        hashPassword = await bcryptjs.hash(password,salt)
    }

    const updateUser=await UserModel.updateOne({_id:userId},{
        //if name email pass and mobile is available then update
        ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
    })
    return res.json({
        message : "Updated successfully",
        error : false,
        success : true,
        data : updateUser
    })

 } catch (error) {
    return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
 }
}

export async function forgotPasswordController(req,res){
    try {
        const { email } = req.body 

        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp=generatedOtp();
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr
        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })
         
        await sendEmail({
            sendTo : email,
            subject : "Forgot password from E-commerce",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "OTP sent to your email",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyForgotPasswordOtp(req,res){
    try {
        const { email , otp }  = req.body
        
        if(!email || !otp){
            return res.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }
        const currentTime = new Date().toISOString()

        if(user.forgot_password_expiry < currentTime  ){
            return res.status(400).json({
                message : "Otp is expired",
                error : true,
                success : false
            })
        }
        // otp is not matched 
        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message : "Invalid otp",
                error : true,
                success : false
            })
        }
         //if otp is not expired
        //otp === user.forgot_password_otp
       
        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })
        return res.json({
            message : "Verify otp successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function resetpassword(req,res){
    try {
        const { email , newPassword, confirmPassword } = req.body 

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "provide required fields email, newPassword, confirmPassword"
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "newPassword and confirmPassword must be same.",
                error : true,
                success : false,
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })

        return res.json({
            message : "Password updated successfully.",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function refreshToken(req,res){
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return res.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return res.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}