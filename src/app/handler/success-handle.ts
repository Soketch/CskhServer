import { ParameterizedContext } from 'koa';

import { COMMON_HTTP_CODE, COMMON_SUCCESS_MSG } from '@/constant';

const successHandler = ({
  httpStatusCode = COMMON_HTTP_CODE.success,
  code = COMMON_HTTP_CODE.success,
  ctx,
  data,
  message,
}: {
  httpStatusCode?: number;
  code?: number;
  ctx: ParameterizedContext;
  data?: any;
  message?: string;
}) => {
  const methods = ctx.request.method as keyof typeof COMMON_SUCCESS_MSG;

  ctx.status = httpStatusCode; // 不手动设置状态的话，koa默认方法返回404，delete方法返回400
  ctx.body = {
    code,
    data,
    message: message || COMMON_SUCCESS_MSG[methods],
  };
};

export default successHandler;
