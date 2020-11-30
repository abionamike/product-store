import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

export interface IProduct extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}

const Product = mongoose.model<IProduct>('product', productSchema);

export default Product;
