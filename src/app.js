/* eslint-disable no-console */
import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import api from './api';

dotenv.config();

const { PORT, MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw Error('mongodb uri가 존재하지 않습니다.');
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (e) {
    throw Error(e);
  }
}
connectDB();

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
