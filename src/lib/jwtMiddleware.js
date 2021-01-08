import jwt from 'jsonwebtoken';

import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  if (!ctx.req.headers.authorization) {
    return next();
  }

  const token = ctx.req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    ctx.state.user = {
      _id: user._id,
      username: user.username,
    };
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
