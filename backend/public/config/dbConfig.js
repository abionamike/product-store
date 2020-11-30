var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${resp.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
});
export default connectDB;
