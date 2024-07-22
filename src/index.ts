import { PROJECT_ENV, PROJECT_NAME, } from '@/constant';

import { MYSQL_CONFIG } from '@/secret/secret';
import { getIpAddress } from '@/utils';
import { connectMysql } from '@/config/mysql';

import {
    chalkERROR,
    chalkINFO,
    chalkSUCCESS,
    chalkWARN,
} from '@/utils/chalkTip';

async function main() {
    try {
        await Promise.all([
            connectMysql(), // 连接mysql
            // connectRedis(), // 连接redis
            // createRedisPubSub(), // 创建redis的发布订阅
        ]);
        await(
            await import('./controller/init.controller')
        ).default.common.initDefault();  //初始化控制器
        await (await import('./setup')).startServer();
        console.log(
            chalkSUCCESS(
                `Server start successfully, visit http://${getIpAddress()}:3000 to access.`
            )
        );
        
    }
    catch (error) {
        console.log(
            chalkERROR(
                `Server start failed, please check the error message below.`
            )
        );
        
        console.error(error);
    }
}

main();


