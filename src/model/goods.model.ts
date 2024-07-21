import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import sequelize from '@/config/mysql';
import { initTable } from '@/init/initDB';
import { IGoods } from '@/interface';

interface GoodsModel
  extends Model<
      InferAttributes<GoodsModel>,
      InferCreationAttributes<GoodsModel>
    >,
    IGoods {}

const model = sequelize.define<GoodsModel>(
  'goods',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    }
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
