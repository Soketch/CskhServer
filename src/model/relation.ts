import { loadAllModel } from '@/init/initDB';

import Auth from '@/model/auth.model';
import Log from '@/model/log.model';
import Role from '@/model/role.model';
import RoleAuth from '@/model/roleAuth.model';
import User from '@/model/user.model';
import UserRole from '@/model/userRole.model';
import UserSocial from '@/model/userSocial.model';

loadAllModel();

Role.belongsToMany(Auth, {
  foreignKey: 'role_id',
  otherKey: 'auth_id',
  constraints: false,
  through: {
    model: RoleAuth,
    unique: false, // 不生成唯一索引
  },
});

Auth.belongsToMany(Role, {
  foreignKey: 'auth_id',
  otherKey: 'role_id',
  constraints: false,
  through: {
    model: RoleAuth,
    unique: false, // 不生成唯一索引
  },
});

Role.belongsTo(Role, {
  as: 'p_role',
  foreignKey: 'p_id',
  constraints: false,
});

Role.hasMany(Role, {
  as: 'c_role',
  foreignKey: 'p_id',
  constraints: false,
});

Auth.belongsTo(Auth, {
  as: 'p_auth',
  foreignKey: 'p_id',
  constraints: false,
});

Auth.hasMany(Auth, {
  as: 'c_auth',
  foreignKey: 'p_id',
  constraints: false,
});


User.hasMany(Log, {
  foreignKey: 'user_id',
  constraints: false,
});
Log.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
});


Role.belongsToMany(User, {
  foreignKey: 'role_id',
  otherKey: 'user_id',
  constraints: false,
  through: {
    model: UserRole,
    unique: false, // 不生成唯一索引
  },
});
User.belongsToMany(Role, {
  foreignKey: 'user_id',
  otherKey: 'role_id',
  constraints: false,
  through: {
    model: UserRole,
    unique: false, // 不生成唯一索引
  },
});

UserSocial.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
});
