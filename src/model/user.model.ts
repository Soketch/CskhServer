import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '@/config/mysql';
import { initTable } from '@/init/initDB';
import { IUser, UserStatusEnum } from '@/types/IUser';


interface UserModel
    extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    IUser { }

const model = sequelize.define<UserModel>(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
            },
        },
        useremail:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: UserStatusEnum.normal,
        },
        avatar: {
            type: DataTypes.STRING(150),
        },
        profileImg:{
            type: DataTypes.STRING(150),
        },
        desc: {
            type: DataTypes.STRING(50),
            defaultValue: '这个人很懒，什么也没有留下',
        },
        token: {
            type: DataTypes.TEXT,
        },
    },
    {
        hooks: {     
        },
        paranoid: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

initTable({ model, sequelize });

export default model;