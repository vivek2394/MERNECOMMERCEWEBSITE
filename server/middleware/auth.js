import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // Log request headers and cookies to check if token is being sent
        console.log("Request Headers:", req.headers);
        console.log("Request Cookies:", req.cookies);

        // Extract token from cookies or authorization header
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

        // Log extracted token
        console.log("Extracted Token:", token);

        if (!token) {
            console.log("No token found! Unauthorized request.");
            return res.status(401).json({
                message: "Provide token"
            });
        }

        // Log if the secret key is available
        console.log("JWT Secret Key:", process.env.SECRET_KEY_ACCESS_TOKEN);

        // Verify the token
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        // Log decoded token details
        console.log("Decoded Token:", decode);

        if (!decode) {
            console.log("JWT Verification failed!");
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        // Attach decoded user ID to the request
        req.userId = decode.id;
        console.log("User ID from token:", req.userId);

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({
            message: "You have not logged in",
            error: true,
            success: false
        });
    }
};

export default auth;
