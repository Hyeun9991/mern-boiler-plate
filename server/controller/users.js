import bcrypt from 'bcrypt';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc Register a new user
// route POST /api/users/register
// @access Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, msg: '이미 존재하는 사용자입니다.' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Login user/set token
// route POST /api/users/login
// @access Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: '사용자가 존재하지 않습니다.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, msg: '비밀번호가 일치하지 않습니다.' });

    generateToken(res, user._id);

    res.status(201).json({ success: true, userId: user._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Logout user
// route POST /api/users/logout
// @access Public
export const logout = async (req, res) => {
  try {
    res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(200)
      .json({ success: true, msg: '로그아웃되었습니다.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
