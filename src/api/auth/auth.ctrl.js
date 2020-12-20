import Joi from 'joi';

import User from '../../models/user';

// 회원가입
export const register = async ctx => {
  // Request body 검증
  const schema = Joi.object().keys({
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

export const login = async ctx => {
  // 로그인
};

export const check = async ctx => {
  // 로그인 상태 확인
};

export const logout = async ctx => {
  // 로그아웃
};
