import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import sequelize from '@/config/mysql';
import { initTable } from '@/init/initDB';
import { IAuth } from '@/interface';

interface AuthModel
  extends Model<InferAttributes<AuthModel>, InferCreationAttributes<AuthModel>>,
    IAuth {}

const model = sequelize.define<AuthModel>(
  'auth',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    auth_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    auth_value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER, // 1：默认，2：自定义
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    p_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {

      afterDestroy() {
        // beforeDestroy 和 afterDestroy hook 只会在具有 onDelete: 'CASCADE' 和 hooks: true 的关联上被调用.
        console.log('afterDestroy');
      },
      afterBulkDestroy() {
        console.log('afterBulkDestroy');
      },
      afterBulkUpdate() {
        console.log('afterBulkUpdate');
      },
    },
    indexes: [
      {
        name: 'p_id',
        fields: ['p_id'],
      },
    ],
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

initTable({ model, sequelize });
export default model;
