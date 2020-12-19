import { model, Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const Post = model('Post', PostSchema);

export default Post;
