import Koa from 'koa';
import koaBody from 'koa-body';
import { CustomError } from '@/model/customError.model';
import { loadAllRoutes } from '@/router';
import { connectWebSocket } from '@/config/websocket';
import { COMMON_HTTP_CODE, STATIC_DIR, UPLOAD_DIR } from '@/constant';


require('module-alias/register');

export async function startServer() {

    const app = new Koa();
    app.use(
        koaBody({
            multipart: true,
            formidable: {
                // 上传目录
                uploadDir: UPLOAD_DIR, // 默认os.tmpdir()
                // 保留文件扩展名
                keepExtensions: true,
                maxFileSize: 1024 * 1024 * 300, // 300m
                // onFileBegin(name, file) {
                //   file.filepath = '可覆盖地址';
                // },
            },
            onError(err) {
                console.log('koaBody错误', err);
                throw new CustomError(
                    err.message,
                    COMMON_HTTP_CODE.serverError,
                    COMMON_HTTP_CODE.serverError
                );
            },
            // parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // 声明将解析正文的 HTTP 方法，默认值['POST', 'PUT', 'PATCH']。替换strict选项。
            // strict: true, // 废弃了。如果启用，则不解析 GET、HEAD、DELETE 请求，默认true。即delete不会解析data数据
        })
    ); // 解析参数

    loadAllRoutes(app); // 加载所有路由

    await new Promise((resolve) => {
        // 语法糖, 等同于http.createServer(app.callback()).listen(3000);
        const httpServer = app.listen(3000, () => {
            resolve('ok');
        });
        connectWebSocket(httpServer); // 初始化websocket
    }); // http接口服务


}