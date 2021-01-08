import Router from 'koa-router';

import checkLoggedIn from '../../lib/checkLoggedIn';
import checkOwnPost from '../../lib/checkOwnPost';
import getPostById from '../../lib/getByPostId';
import * as postCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);
posts.get('/:id', getPostById, postCtrl.read);
posts.patch('/:id', checkLoggedIn, getPostById, checkOwnPost, postCtrl.update);
posts.delete('/:id', checkLoggedIn, getPostById, checkOwnPost, postCtrl.remove);

export default posts;
