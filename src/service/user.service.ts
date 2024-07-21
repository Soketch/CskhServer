import { IUser } from "@/types/IUser";
import userModel from '@/model/user.model';
import { Op, literal, where } from 'sequelize';
import { handlePaging, isPureNumber} from "@/utils";
import { IList } from "@/interface";
class userService {
    
    // 是否存在用户
    async isExist(names: string[]) { // 改为 string[] 类型
        const res = await userModel.count({
            where: {
                username: {
                    [Op.in]: names, // 使用数组
                },
            },
        });
        return res === names.length;
    }
    
    // 获取用户信息(通过用户id)
    async getUser(id: number){
    }

    // 获取用户信息(通过用户名)
    async getUserNames(ids: number[]){

    }

    /** 获取用户列表 */
    async getList({
        id,
        orderBy,
        orderName,
        nowPage,
        pageSize,
        keyWord,
        rangTimeType,
        rangTimeStart,
        rangTimeEnd,
    }: IList<IUser>) {
        let offset;
        let limit;
        if (nowPage && pageSize) {
            offset = (+nowPage - 1) * +pageSize;
            limit = +pageSize;
        }
        const allWhere: any = {};
        if (id !== undefined && isPureNumber(`${id}`)) {
            allWhere.id = id;
        }
        if (keyWord) {
            const keyWordWhere = [
                {
                    username: {
                        [Op.like]: `%${keyWord}%`,
                    },
                },
                {
                    desc: {
                        [Op.like]: `%${keyWord}%`,
                    },
                },
            ];
            allWhere[Op.or] = keyWordWhere;
        }
        if (rangTimeType && rangTimeStart && rangTimeEnd) {
            allWhere[rangTimeType] = {
                [Op.gt]: new Date(+rangTimeStart),
                [Op.lt]: new Date(+rangTimeEnd),
            };
        }
        const orderRes: any[] = [];
        if (orderName && orderBy) {
            orderRes.push([orderName, orderBy]);
        }
        const result = await userModel.findAndCountAll({
            attributes: {
                exclude: ['password', 'token'],
            },
            order: [...orderRes],
            limit,
            offset,
            where: {
                ...allWhere,
            },
            distinct: true,
        });
        return handlePaging(result, nowPage, pageSize);
    }

    // id登录
    async login({ id, password }: IUser) {
        const result = await userModel.findOne({
            attributes: {
                exclude: ['password', 'token'],
            },
            where: {
                id,
                password,
            },
        });
        return result;
    }
    //通过用户名登录
    async usernameLogin({username, password}:IUser) {
        const result = await userModel.findOne({
            attributes: {
                exclude: ['password', 'token'],
            },
            where: {
                username,
                password,
            },
        });
        return result;
    }

    // 注册新用户
    async register(user: IUser) {
        const result = await userModel.create(user)
        return result;
    }
    
    
    // 更新用户信息
    async updateUser(user: IUser): Promise<IUser> {
        return {} as IUser;
    }
    
    // 删除用户
    async deleteUser(id: number): Promise<void> {
    }

    // 通过用户名获取用户信息
    async getUsersByUsername(username: string): Promise<IUser[]> {
        return [];
    }

    // 通过用户名查找用户
    async findUserByUsername(username: string): Promise<IUser | undefined> {
        return undefined;
    }

    // 通过用户名查找用户，返回用户list, (模糊查询)
    async findUsersByUsername(username: string): Promise<IUser[]> {
        return [];
    }

    // 通过邮箱查找用户
    async findUserByEmail(email: string): Promise<IUser | undefined> {
        return undefined;
    }

    // 通过邮箱查找用户，返回用户list, (模糊查询)
    async findUsersByEmail(email: string): Promise<IUser[]> {
        return [];
    }

    // 根据id查找用户密码
    async findUserPasswordById(id: number): Promise<string | undefined> {
        return undefined;
    }

    //根据id修改用户密码
    async updateUserPasswordById(id: number, password: string): Promise<void> {
    }

    // 根据id查找用户角色
    async findUserRoleById(id: number): Promise<string | undefined> {
        return undefined;
    }


    /** 根据id修改用户 */
    async updateUserById({ id, username, desc, status, avatar, token }: IUser) {
        const result = await userModel.update(
            { username, desc, status, avatar, token },
            { where: { id } }
        );
        return result;
    }

    /** 是否同名，区分大小写。同名则返回同名用户的信息,否则返回null */
    async isSameName(username: string) {
        const result = await userModel.findOne({
            attributes: {
                exclude: ['password', 'token'],
            },
            // @ts-ignore
            where: {
                username: where(literal(`BINARY username`), username),
            },
        });
        return result;
    }

    /** 根据id查找用户（不返回password，但返回token） */
    async findAndToken(id: number) {
        const result = await userModel.findOne({
            attributes: {
                exclude: ['password'],
            },
            where: { id },
        });
        return result;
    }



}


export default new userService();