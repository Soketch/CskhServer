/**
 * 初始化控制器
 */
import cryptojs from 'crypto-js';
import { ParameterizedContext } from 'koa';

import { signJwt } from '@/app/auth/authJwt';
import successHandler from '@/app/handler/success-handle';
import { COMMON_HTTP_CODE} from '@/constant';
import { IUser } from '@/types/IUser';
import { initUser } from '@/init/initUser';
import { IInitUser } from '@/interface';
import { mockTimeBatchInsert } from '@/init/initDB';
import mockDayDataModel from '@/model/mockDayData.model';
import mockHourDataModel from '@/model/mockHourData.model';
import mockMinuteTenDataModel from '@/model/mockMinuteTenData.model';
import mockMinuteThirtyDataModel from '@/model/mockMinuteThirtyData.model';
import roleModel from '@/model/role.model';
import roleAuthModel from '@/model/roleAuth.model';
import userModel from '@/model/user.model';
import { bulkCreateRoleAuth, bulkCreateRole, bulkCreateAuth, bulkCreateGoods } from '@/init/initData';
import { CustomError } from '@/model/customError.model';
import { chalkWARN } from '@/utils/chalkTip';
import authModel from '@/model/auth.model';
import userService from '@/service/user.service';
import { getRandomString } from '@/utils';
import logModel from '@/model/log.model';
import userRoleModel from '@/model/userRole.model';

import goodsModel from '@/model/goods.model';

class InitController{
    common = {
        initDefault: async () => {
            try{
                await this.common.initUser();
                // await this.common.initGoods(); 
                await Promise.all([
                    this.common.initDayData(365 * 3),
                    this.common.initHourData(365 * 3 * 24),
                    this.common.initMinuteTenData(365 * 3 * 24 * 6),
                    this.common.initMinuteThirtyData(365 * 3 * 24 * 2),
                    this.common.initRole(),
                    this.common.initAuth(),
                    this.common.initRoleAuth(),
                ]);
            }catch(e){
                console.log(chalkWARN('已初始化数据库，不能在初始化了'));
            }
        },

        initRole: async () => {
            const count = await roleModel.count();
            if (count === 0) {
                await roleModel.bulkCreate(bulkCreateRole);
            } else {
                throw new CustomError(
                    '已经初始化过角色，不能再初始化了！',
                    COMMON_HTTP_CODE.paramsError,
                    COMMON_HTTP_CODE.paramsError
                );
            }
        },
        initRoleAuth: async () => {
            const count = await roleAuthModel.count();
            if (count === 0) {
                await roleAuthModel.bulkCreate(bulkCreateRoleAuth);
            } else {
                throw new CustomError(
                    '已经初始化过角色权限了，不能再初始化了！',
                    COMMON_HTTP_CODE.paramsError,
                    COMMON_HTTP_CODE.paramsError
                );
            }
        },
        initUser: async() => {
            const quequ: Promise<any>[] = [];
            const initOneUser = async (user: IInitUser) => {
                if (!user.username) return;
                const userIsExist = await userService.isExist([user.username]);
                let userRes;
                if (!userIsExist) {
                    const userInfo = {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                    };
                    const exp = 24; // token过期时间：24小时
                    const token = signJwt({ userInfo, exp });
                    userRes = await userService.register({
                        ...userInfo,
                        password: getRandomString(8),
                        token,
                    });
                    // @ts-ignore
                    await userRes.setRoles(user.user_roles);
                } else {
                    // console.log(chalkWARN(`已存在id为：${user.id}的用户！`));
                    return;
                }
            };
            Object.keys(initUser).forEach((item) => {
                quequ.push(initOneUser(initUser[item]));
            });
            await Promise.all(quequ);
        },
        initAuth: async() => {
            const count = await authModel.count();
            if (count === 0) {
                await authModel.bulkCreate(bulkCreateAuth);
            } else {
                throw new CustomError(
                    '已经初始化过权限了，不能再初始化了！',
                    COMMON_HTTP_CODE.paramsError,
                    COMMON_HTTP_CODE.paramsError
                );
            }
        },
        initDayData: async (total = 365 * 3) => {
            // const count = await mockDayDataModel.count();
            // if (count === 0) {
            await mockTimeBatchInsert({
                model: mockDayDataModel,
                unit: 'day',
                unitNum: 1,
                field: 'day',
                total,
                format: 'YYYY-MM-DD 00:00:00',
            });
            // } else {
            //   throw new CustomError(
            //     `已经初始化过${mockDayDataModel.name}表了，不能再初始化了！`,
            //     COMMON_HTTP_CODE.paramsError,
            //     COMMON_HTTP_CODE.paramsError
            //   );
            // }
        },
        initHourData: async (total = 365 * 3 * 24) => {
            await mockTimeBatchInsert({
                model: mockHourDataModel,
                unit: 'hour',
                unitNum: 1,
                field: 'hour',
                total,
                format: 'YYYY-MM-DD HH:00:00',
            });
        },
        initMinuteTenData: async (total = 365 * 3 * 24 * 6) => {
            await mockTimeBatchInsert({
                model: mockMinuteTenDataModel,
                unit: 'minute',
                unitNum: 10,
                field: 'minute',
                total,
                format: 'YYYY-MM-DD HH:mm:00',
            });
        },
        initMinuteThirtyData: async (total = 365 * 3 * 24 * 2) => {
            await mockTimeBatchInsert({
                model: mockMinuteThirtyDataModel,
                unit: 'minute',
                unitNum: 30,
                field: 'minute',
                total,
                format: 'YYYY-MM-DD HH:mm:00',
            });
        },
        initGoods: async () => {
            const count = await goodsModel.count();
            if (count === 0) {
                await goodsModel.bulkCreate(bulkCreateGoods);
            } else {
                throw new CustomError(
                    '已经初始化过商品了，不能再初始化了！',
                    COMMON_HTTP_CODE.paramsError,
                    COMMON_HTTP_CODE.paramsError
                );
            }
        },
    }
    // 初始化用户
    initUser = async (ctx: ParameterizedContext, next: any) => {
        await this.common.initUser();
        successHandler({ ctx, data: '初始化用户成功！' });
        await next();
    };
    // 添加用户
    addUser = async (ctx: ParameterizedContext, next: any) => {
        await this.common.initRole();
        successHandler({ ctx, message: '初始化角色成功！' });
        await next();
    };

    // 初始化角色
    initRole = async (ctx: ParameterizedContext, next: any) => {
        await this.common.initRole();
        successHandler({ ctx, message: '初始化角色成功！' });
        await next();
    };

    // 初始化角色权限
    initRoleAuth = async (ctx: ParameterizedContext, next: any) => {
        await this.common.initRoleAuth();
        successHandler({ ctx, message: '初始化角色权限成功！' });
        await next();
    };

    // 初始化权限
    initAuth = async (ctx: ParameterizedContext, next: any) => {
        await this.common.initAuth();
        successHandler({ ctx, message: '初始化权限成功！' });
        await next();
    };

    // 初始化商品
    initGoods = async (ctx: ParameterizedContext, next: any) => {
        await this.common.initGoods();
        successHandler({ ctx, message: '初始化商品成功！' });
        await next();
    };

    // 初始化角色、权限、角色权限
    rbacMode = async (ctx: ParameterizedContext, next: any) => {
        await Promise.all([
            roleModel.sync({ force: true }),
            authModel.sync({ force: true }),
            roleAuthModel.sync({ force: true }),
        ]);
        await this.common.initRole();
        await this.common.initAuth();
        await this.common.initRoleAuth();
        successHandler({ ctx, message: '初始化角色、权限、角色权限成功！' });
        await next();
    };

    // 初始化时间表
    initDayData = async (ctx: ParameterizedContext, next: any) => {
        await mockDayDataModel.sync({ alter: true });
        await this.common.initDayData(365 * 3);
        successHandler({ ctx, data: `初始化${mockDayDataModel.name}表成功！` });
        await next();
    };

    // 初始化时间表
    initHourData = async (ctx: ParameterizedContext, next: any) => {
        await mockHourDataModel.sync({ alter: true });
        await this.common.initHourData(365 * 3 * 24);
        successHandler({ ctx, data: `初始化${mockHourDataModel.name}表成功！` });
        await next();
    };

    // 初始化时间表
    initMinuteTenData = async (ctx: ParameterizedContext, next: any) => {
        await mockMinuteTenDataModel.sync({ alter: true });
        await this.common.initMinuteTenData(365 * 3 * 24 * 6);
        successHandler({
            ctx,
            data: `初始化${mockMinuteTenDataModel.name}表成功！`,
        });
        await next();
    };

    // 初始化时间表
    initMinuteThirtyData = async (ctx: ParameterizedContext, next : any) => {
        await mockMinuteThirtyDataModel.sync({ alter: true });
        await this.common.initMinuteThirtyData(365 * 3 * 24 * 2);
        successHandler({
            ctx,
            data: `初始化${mockMinuteThirtyDataModel.name}表成功！`,
        });
        await next();
    };

    // 重建表
    forceTable = async (ctx: ParameterizedContext, next: any) => {
        await Promise.all([
            logModel.sync({ force: true }),
            roleModel.sync({ force: true }),
            authModel.sync({ force: true }),
            roleAuthModel.sync({ force: true }),
            goodsModel.sync({ force: true }),
            userRoleModel.sync({ force: true }),
    
        ]);

        successHandler({ ctx, data: '重建表成功！' });
        await next();
    };

    deleteUser = async (ctx: ParameterizedContext, next: any) => {
        const { userId } = ctx.request.body;
        const res1 = await userModel.findAndCountAll({
            where: { id: userId },
        });
        if (!res1.count) {
            throw new CustomError(
                // eslint-disable-next-line
                `不存在id为${userId}的用户！`,
                COMMON_HTTP_CODE.paramsError,
                COMMON_HTTP_CODE.paramsError
            );
        }
        // 删除该用户（user表）
        await userModel.destroy({ where: { id: userId } });

        // 删除该用户的所有角色（user_role表）
        await userRoleModel.destroy({ where: { user_id: userId } });


        successHandler({ ctx, data: '删除用户成功！' });
        await next();
    };

}


export default new InitController();