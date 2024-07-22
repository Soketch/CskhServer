import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '@/config/mysql';
import { initTable } from '@/init/initDB';
import { IUserSocial } from '@/types/IUser';

interface UserSocialModel
    extends Model<InferAttributes<UserSocialModel>, InferCreationAttributes<UserSocialModel>>,
    IUserSocial { }

const model = sequelize.define<UserSocialModel>(
    'userSocial',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        desc: {
            type: DataTypes.STRING(255),
            defaultValue: '',
        },
        profileImgs: {
            type: DataTypes.JSONB, // 使用 JSONB 存储数组
            defaultValue: [],
        },
        videoUrl: {
            type: DataTypes.JSONB, // 使用 JSONB 存储数组
            defaultValue: [],
        },
        websiteUrl: {
            type: DataTypes.STRING(255),
            defaultValue: '',
        },
        socialLinks: {
            type: DataTypes.JSONB, // 使用 JSONB 存储社交媒体链接
            defaultValue: {},
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

initTable({ model, sequelize });

export default model;
