import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.setPassword = async function (password) {
  const hashed = await bcrypt.hash(password, 10);
  this.password = hashed;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // 7 days
    },
  );
  return token;
};

const User = model('User', UserSchema);

export default User;
