import Router from 'koa-router';

import { apiVerifyAuth } from '@/app/verify.middlewre';
import { DEFAULT_AUTH_INFO } from '@/constant';
import userController from '@/controller/user.controller';
import { verifyProp } from '@/middleware/user.middleware';

const userRouter = new Router({ prefix: '/user' });

userRouter.post('/register', userController.register);


// 账号密码登录
userRouter.post('/login', verifyProp, userController.login);

// 用户名密码登录
userRouter.post('/username_login', verifyProp, userController.usernameLogin);

// 用户列表
userRouter.get('/list', userController.list);
;

export default userRouter;
