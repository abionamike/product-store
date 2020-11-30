/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoutes.js';
import uploadRoute from './routes/uploadRoute.js';
const app = express();
connectDB();
dotenv.config();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is running now...');
});
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/upload', uploadRoute);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/upload/images')));
export default app;
