import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 18,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: String,
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
