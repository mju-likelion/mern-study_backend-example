import Joi from 'joi';

import User from '../../models/user';

// 회원가입
export const register = async ctx => {
  // Request body 검증
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(256).required(),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { username, email, password } = ctx.request.body;
  try {
    // username이 이미 존재하는지 확인
    const usernameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });
    if (usernameExist || emailExist) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({ username, email });
    await user.setPassword(password);
    await user.save();

    const data = user.toJSON();
    delete data.password;
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인
export const login = async ctx => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(256).required(),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { email, password } = ctx.request.body;
  try {
    // email이 존재하는지 확인
    const user = await User.findOne({ email });
    if (!user) {
      ctx.status = 401; // Unauthorized
      ctx.body = 'Wrong Email';
      return;
    }

    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401; // Unauthorized
      ctx.body = 'Wrong Password';
      return;
    }

    ctx.body = user.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인 상태 확인
export const check = async ctx => {
  const { user } = ctx.state;
  ctx.body = user;
};
