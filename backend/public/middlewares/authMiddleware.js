var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = yield User.findById(id).select('-password');
        next();
    }
    else {
        res.status(401).json({ error: 'Unauthorized, token failed' });
    }
});
export { protect };
