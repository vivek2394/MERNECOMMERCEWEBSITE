import UserModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'

const genertedRefreshToken = async(userId)=>{
    const token = await jwt.sign({ id : userId},
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn : '7d'}
    )
    // store refresh token in database
    const updateRefreshTokenUser = await UserModel.updateOne(
        { _id : userId},// Find user by ID
        {
            refresh_token : token // Store the token in the `refresh_token` field
        }
    )

    return token
}

export default genertedRefreshToken;