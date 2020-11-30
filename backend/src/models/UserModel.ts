/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import pkg from 'validator';

const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    lowercase: true,
    validate: [isEmail, 'Pls enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

export interface IUser extends mongoose.Document {
  matchPassword?: any;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

userSchema.pre<IUser>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('user', userSchema);

export default User;
