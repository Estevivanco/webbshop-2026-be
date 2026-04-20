import jwt from "jsonwebtoken"

// Validate required environment variables
if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET environment variable is not defined');
}
if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not defined');
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";

export const generateAccessToken = (userId, role = 'customer', firstName = '') => {
    return jwt.sign(
        { userId, role, firstName },
        JWT_ACCESS_SECRET,
        { expiresIn: JWT_ACCESS_EXPIRES }
    )
}

export const generateRefreshToken = (userId, role = 'customer', firstName = '') => {
    return jwt.sign(
        { userId, role, firstName },
        JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRES }
    )
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_ACCESS_SECRET)
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET)
}