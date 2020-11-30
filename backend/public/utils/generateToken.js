import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
});
export default generateToken;
