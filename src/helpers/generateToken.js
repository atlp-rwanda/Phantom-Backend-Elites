import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

function generateToken(payload, expiresInPeriod) {
    const expiresInTime = expiresInPeriod || 24 * 60 * 60;
    const token = jwt.sign(payload, "secreteKey", {
        expiresIn: expiresInTime
    });
    return token;
}

function verifyToken(token) {
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        return decode;
    } catch (error) {
        return error.message;
    }
}

export { generateToken, verifyToken };

