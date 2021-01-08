const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.author._id.toString() !== user._id.toString()) {
    ctx.status = 403; // Forbidden
    return;
  }
  return next();
};

export default checkOwnPost;
