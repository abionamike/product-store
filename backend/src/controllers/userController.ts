/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

// error handlers
const handleErrors = (err: any) => {
  const errors = { email: '', password: '' };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }

  // validation error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      if (properties.path === 'email') {
        errors.email = properties.message;
      }
      if (properties.path === 'password') {
        errors.password = properties.message;
      }
    });
  }
  return errors;
};

// @desc Get all users
// @route GET /api/users
// @access private/admin
const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(404);
    throw new Error('Users not found');
  }
};

// @desc Login a user
// @route POST /api/users/login
// @access public
const userLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    user ? (
      await user.matchPassword(password) ? (
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      ) : (
        res.status(404).json({ error: 'Invalid password' })
      )
    ) : (
      res.status(404).json({ error: 'Invalid email address' })
    );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// @desc Register a new user
// @route POST /api/users
// @access public
const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(404).json({ errors });
  }
};

// @desc delete a user
// @route DELETE /api/users/:id
// @access private/admin
const deleteUser = async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc get user by Id
// @route DELETE /api/users/:id
// @access private/admin
const getUserById = async (req: any, res: any) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc Update user
// @route PUT /api/users/:id
// @access private/admin
const updateUser = async (req: any, res: any) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export {
  getUsers, userLogin, registerUser, updateUser, getUserById, deleteUser,
};
