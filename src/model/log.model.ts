import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import sequelize from '@/config/mysql';
import { initTable } from '@/init/initDB';
import { ILog } from '@/interface';

interface LogModel
  extends Model<InferAttributes<LogModel>, InferCreationAttributes<LogModel>>,
    ILog {}

const model = sequelize.define<LogModel>(
  'log',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: -1, // -1:游客 非-1:用户
    },
    api_duration: {
      type: DataTypes.INTEGER,
    },
    api_user_agent: {
      type: DataTypes.TEXT, // qq浏览器的user_agent能达到四百多字符。。。。
    },
    api_forwarded_for: {
      type: DataTypes.STRING,
    },
    api_referer: {
      type: DataTypes.STRING,
    },
    api_real_ip: {
      type: DataTypes.STRING(50),
    },
    api_host: {
      type: DataTypes.STRING(100),
    },
    api_hostname: {
      type: DataTypes.STRING(100),
    },
    api_method: {
      type: DataTypes.STRING(20),
    },
    api_path: {
      type: DataTypes.STRING(100),
    },
    api_query: {
      type: DataTypes.STRING,
    },
    api_body: {
      type: DataTypes.TEXT,
    },
    api_status_code: {
      type: DataTypes.INTEGER,
    },
    api_error: {
      type: DataTypes.TEXT,
    },
    api_err_msg: {
      type: DataTypes.STRING,
    },
    api_err_code: {
      type: DataTypes.INTEGER,
    },
  },
  {
    indexes: [
      {
        name: 'user_id',
        fields: ['user_id'],
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
