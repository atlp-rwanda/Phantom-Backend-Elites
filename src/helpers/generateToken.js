import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

function generateToken(payload, expiresInPeriod) {
    const expiresInTime = expiresInPeriod || 24 * 60 * 60;
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: expiresInTime
    });
    return token;
}

export { generateToken as default };

