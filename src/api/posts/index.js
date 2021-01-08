import Router from 'koa-router';

import checkLoggedIn from '../../lib/checkLoggedIn';
import getPostById from '../../lib/getByPostId';
import * as postCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);
posts.get('/:id', getPostById, postCtrl.read);
// 아래 두 router는 본인인지 추후에 인증 추가 필요
posts.patch('/:id', checkLoggedIn, postCtrl.update);
posts.delete('/:id', checkLoggedIn, postCtrl.remove);

export default posts;
