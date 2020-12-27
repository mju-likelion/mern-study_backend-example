import Joi from 'joi';
import Post from '../../models/post';

// 전체 글 조회
export const list = async ctx => {
  // username까지만 필요하므로 populate는 username만 한다
  const posts = await Post.find({}).populate('author', 'username');
  ctx.body = posts;
};

// 글 작성
export const write = async ctx => {
  // Request body 검증
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string(),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { title, body } = ctx.request.body;
  const { user } = ctx.state;

  try {
    const post = new Post({ title, body, author: user.id });
    await post.save();

    const data = post.toJSON();
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async ctx => {
  // 특정 글 조회
};

export const update = async ctx => {
  // 글 수정
};

export const remove = async ctx => {
  // 글 삭제
};
