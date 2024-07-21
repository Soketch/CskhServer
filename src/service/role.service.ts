import _ from 'lodash';
import { Op } from 'sequelize';

import { IList, IRole } from '@/interface';
import roleModel from '@/model/role.model';
import userModel from '@/model/user.model';
import { handlePaging } from '@/utils';

class RoleService {
    /** 角色是否存在 */
    async isExist(ids: number[]) {
        const res = await roleModel.count({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });
        return res === ids.length;
    }

    /** 获取角色列表(分页) */
    async getList({
        id,
        type,
        orderBy,
        orderName,
        nowPage,
        pageSize,
        keyWord,
        rangTimeType,
        rangTimeStart,
        rangTimeEnd,
    }: IList<IRole>) {
        let offset;
        let limit;
        if (nowPage && pageSize) {
            offset = (+nowPage - 1) * +pageSize;
            limit = +pageSize;
        }
        const allWhere: any = {};
        if (id) {
            allWhere.id = id;
        }
        if (type) {
            allWhere.type = type;
        }
        if (keyWord) {
            const keyWordWhere = [
                {
                    role_name: {
                        [Op.like]: `%${keyWord}%`,
                    },
                },
                {
                    role_value: {
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
        const result = await roleModel.findAndCountAll({
            order: [...orderRes],
            limit,
            offset,
            distinct: true,
            where: {
                ...allWhere,
            },
        });
        return handlePaging(result, nowPage, pageSize);
    }

    /** 获取角色列表(不分页) */
    async getAllList({
        id,
        type,
        orderBy,
        orderName,
        keyWord,
        rangTimeType,
        rangTimeStart,
        rangTimeEnd,
    }: IList<IRole>) {
        const allWhere: any = {};
        if (id) {
            allWhere.id = id;
        }
        if (type) {
            allWhere.type = type;
        }
        if (keyWord) {
            const keyWordWhere = [
                {
                    role_name: {
                        [Op.like]: `%${keyWord}%`,
                    },
                },
                {
                    role_value: {
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
        const result = await roleModel.findAndCountAll({
            order: [...orderRes],
            distinct: true,
            where: {
                ...allWhere,
            },
        });
        return result;
    }

    /** 获取所有p_id不为null的角色 */
    async getPidNotNullRole() {
        const result = await roleModel.findAndCountAll({
            // @ts-ignore
            where: {
                p_id: {
                    [Op.not]: null, // IS NOT NULL
                    // [Op.not]: true, // IS NOT TRUE
                },
            },
        });
        return result;
    }

    /** 查找角色 */
    async find(id: number) {
        const result = await roleModel.findOne({
            where: {
                id,
            },
        });
        return result;
    }

    /** 查找id为[a,b,c....]的权限 */
    async findAllByInId(ids: number[]) {
        const result = await roleModel.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });
        return result;
    }

    /** 根据p_id查找权限 */
    async findByPid(p_id: number) {
        const result = await roleModel.findAll({
            where: {
                p_id,
            },
        });
        return result;
    }

    /** 根据角色id查找对应的权限 */
    async getRoleAuth(roleId: number) {
        const role = await roleModel.findByPk(roleId);
        // @ts-ignore
        const auths: any = await role?.getAuths();
        const result: any = [];
        auths.forEach((v: any) => {
            const obj = v.get();
            delete obj.role_auth;
            result.push(obj);
        });
        return result;
    }

    /** 获取某个用户的角色 */
    async getUserRole(id: number) {
        const user = await userModel.findByPk(id);
        if (!user) {
            throw new Error(`不存在id为${id}的用户！`);
        }
        // @ts-ignore
        const roles: IRole[] = await user?.getRoles({
            joinTableAttributes: [],
        });
        return roles;
    }

    /** 修改角色 */
    async update(data: IRole) {
        const { id } = data;
        const data2 = _.omit(data, ['id']);
        const result = await roleModel.update(data2, { where: { id } });
        return result;
    }

    /** 修改角色 */
    async updateMany(ids: number[], p_id: number) {
        const result = await roleModel.update(
            {
                p_id,
            },
            {
                where: {
                    id: {
                        [Op.in]: ids,
                    },
                },
            }
        );
        return result;
    }

    /** 修改角色 */
    async update1({ id, p_id, role_name, role_value }: IRole) {
        if (id === p_id) throw new Error(`id不能等于p_id！`);
        if (p_id === 0) {
            const result = await roleModel.update(
                {
                    p_id,
                    role_name,
                    role_value,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            return result;
        }
        const result = await roleModel.update(
            {
                p_id,
                role_name,
                role_value,
            },
            {
                where: {
                    id,
                },
            }
        );
        return result;
    }

    async findAllChildren(id: number) {
        const result = await roleModel.findAll({
            where: {
                p_id: id,
            },
        });
        return result;
    }

    /** 创建角色 */
    async create(data: IRole) {
        const result = await roleModel.create(data);
        return result;
    }

    /** 更新用户角色 */
    async updateUserRole({
        user_id,
        role_ids,
    }: {
        user_id: number;
        role_ids: number[];
    }) {
        const user = await userModel.findByPk(user_id);
        // @ts-ignore
        const result = await user?.setRoles(role_ids);
        return result;
    }

    /** 删除角色 */
    async delete(ids: number[]) {
        const result = await roleModel.destroy({
            where: {
                id: {
                    [Op.in]: ids, // [Op.in]的话，ids是[]，就一个也不会删。如果是[Op.or]，ids是[]，就会删除所有。
                },
            },
        });
        return result;
    }
}

export default new RoleService();
