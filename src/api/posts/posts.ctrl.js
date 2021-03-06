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
    const post = new Post({ title, body, author: user._id });
    await post.save();

    const data = post.toJSON();
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 특정 글 조회
export const read = async ctx => {
  const { post } = ctx.state;
  ctx.body = post;
};

// 글 수정
export const update = async ctx => {
  const schema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { id } = ctx.params;

  try {
    // 아래의 세 번째 인자 { new: true } 는 업데이트된 값을 받기 위해서 넣은 인자
    // 넣지 않을 경우 업데이트 이전의 데이터가 반환됨
    const affacted = await Post.findByIdAndUpdate(
      id,
      { ...ctx.request.body },
      { new: true },
    );
    ctx.body = affacted;
  } catch (e) {
    ctx.throw(e);
  }
};

// 글 삭제
export const remove = async ctx => {
  const { id } = ctx.params;

  try {
    await Post.findByIdAndDelete(id);
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};
