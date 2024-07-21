// file system
import fs from "fs";
import path from "path";
import Router from "koa-router";
import { chalkERROR, chalkSUCCESS, chalkINFO } from "@/utils/chalkTip";

const router = new Router();


export function loadAllRoutes(app: any) {
    router.get('/', async (ctx, next) => {
        ctx.body = {
            message: "欢迎访问 CSKH SERVER",
        };
        await next();
    });
    app.use(router.routes()).use(router.allowedMethods()); // 每一个router都要配置routes()和allowedMethods()

    const err: string[] = [];

    fs.readdirSync(__dirname).forEach((file: string) => {
        try {
            if (file === "index.ts") {
                return;
            }
            const allRouter = require(`./${file}`).default;
            app.use(allRouter.routes()).use(allRouter.allowedMethods()); // allRouter也要配置routes()和allowedMethods()

            console.log(chalkINFO(`Load router ${file}`));
        }
        catch (e) {
            err.push(file);
            console.log(chalkERROR(`Load router ${file} failed`));
            console.log(e);
        }
    });

    if(err.length > 0) {
        console.log(chalkERROR(`Load router failed, ${err.toString()} error occurred`));
    }
    else {
        console.log(chalkSUCCESS("Load router all success"));
    }

}


export default router;