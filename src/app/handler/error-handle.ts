import { ParameterizedContext } from 'koa';

import {
  COMMON_ERROE_MSG,
  COMMON_ERROR_CODE,
  COMMON_HTTP_CODE,
} from '@/constant';
import { CustomError } from '@/model/customError.model';
import { chalk, chalkERROR } from '@/utils/chalkTip';

const errorHandler = (error: { message: any; httpStatusCode: number; errorCode: any; }, ctx: ParameterizedContext) => {
  const { path, method } = ctx.request;
  const ip = (ctx.request.headers['x-real-ip'] as string) || '127.0.0.1';
  // eslint-disable-next-line
  const errorLog = (error:any) => {
    console.log(chalk.redBright('httpStatusCode:'), error.httpStatusCode);
    console.log(chalk.redBright('errorCode:'), error.errorCode);
    console.log(chalk.redBright('message:'), error.message);
    console.log(chalk.redBright('query:'), { ...ctx.request.query });
    console.log(chalk.redBright('params:'), ctx.params);
    console.log(chalk.redBright('host:'), ctx.request.header.host);
    console.log(chalk.redBright('referer:'), ctx.request.header.referer);
    console.log(chalk.redBright('cookie:'), ctx.request.header.cookie);
    console.log(chalk.redBright('token:'), ctx.request.headers.authorization);
    console.log(chalk.redBright('error:'), error);
    console.log(chalk.redBright('ctx.body:'), ctx.body);
  };
  function main() {
    if (!(error instanceof CustomError)) {
      console.log(chalkERROR(`收到非自定义错误！`));
      const defaultError = {
        code: COMMON_HTTP_CODE.serverError,
        errorCode: COMMON_ERROR_CODE.serverError,
        error: error.message,
        message: COMMON_ERROE_MSG.serverError,
      };
      ctx.status = defaultError.code;
      ctx.body = {
        code: defaultError.errorCode,
        errorCode: defaultError.errorCode,
        error: defaultError.error,
        message: defaultError.message,
      };
      errorLog(error);
      console.log(
        chalkERROR(`非自定义错误返回前端的数据，http状态码：${ctx.status}`),
        defaultError
      );
      return;
    }

    console.log(chalkERROR(`===== 收到自定义错误:${method} ${path} =====`));

    ctx.status = error.httpStatusCode ;
    ctx.body = {
      code: error.errorCode,
      errorCode: error.errorCode,
      message: error?.message || ctx.status,
    };

    errorLog(error);
    console.log(
      chalkERROR(`===== 收到自定义错误: ip:${ip},${method} ${path} =====`)
    );
  }

  main();
};

export default errorHandler;
