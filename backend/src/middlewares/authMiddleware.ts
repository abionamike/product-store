/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const protect = async (req: any, res: any, next: any) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];

    const { id }: any = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = await User.findById(id).select('-password');

    next();
  } else {
    res.status(401).json({ error: 'Unauthorized, token failed' });
  }
};

export { protect };
