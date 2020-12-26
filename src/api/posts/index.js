import Router from 'koa-router';

import jwtMiddleware from '../../lib/jwtMiddleware';
import * as postCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', jwtMiddleware, postCtrl.write);
posts.get('/:id', postCtrl.read);
// 아래 두 router는 본인인이 추후에 인증 추가 필요
posts.patch('/:id', jwtMiddleware, postCtrl.update);
posts.delete('/:id', jwtMiddleware, postCtrl.remove);

export default posts;
