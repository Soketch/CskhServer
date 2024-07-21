import {
  DEFAULT_AUTH_INFO,
  DEFAULT_ROLE_INFO,
} from '@/constant';

import {
  FormTypeEnum,
  IAuth,
  IRole,
  IGoods
} from '@/interface';

const initAuth = () => {
  const deafultAuth: IAuth[] = [
    {
      id: DEFAULT_AUTH_INFO.ALL_AUTH.id,
      auth_name: '全部权限',
      auth_value: DEFAULT_AUTH_INFO.ALL_AUTH.auth_value,
      type: 1,
      priority: 99,
      p_id: 0,
    },
    {
      id: DEFAULT_AUTH_INFO.USER_MANAGE.id,
      auth_name: '用户管理',
      auth_value: DEFAULT_AUTH_INFO.USER_MANAGE.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.ALL_AUTH.id,
    },
    {
      id: DEFAULT_AUTH_INFO.ROLE_MANAGE.id,
      auth_name: '角色管理',
      auth_value: DEFAULT_AUTH_INFO.ROLE_MANAGE.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.ALL_AUTH.id,
    },
    {
      id: DEFAULT_AUTH_INFO.AUTH_MANAGE.id,
      auth_name: '权限管理',
      auth_value: DEFAULT_AUTH_INFO.AUTH_MANAGE.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.ALL_AUTH.id,
    },
    {
      id: DEFAULT_AUTH_INFO.MESSAGE_MANAGE.id,
      auth_name: '消息管理',
      auth_value: DEFAULT_AUTH_INFO.MESSAGE_MANAGE.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.ALL_AUTH.id,
    },
    {
      id: DEFAULT_AUTH_INFO.MESSAGE_SEND.id,
      auth_name: '消息发送',
      auth_value: DEFAULT_AUTH_INFO.MESSAGE_SEND.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.MESSAGE_MANAGE.id,
    },
    {
      id: DEFAULT_AUTH_INFO.MESSAGE_DISABLE.id,
      auth_name: '消息禁用',
      auth_value: DEFAULT_AUTH_INFO.MESSAGE_DISABLE.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.MESSAGE_MANAGE.id,
    },
    {
      id: DEFAULT_AUTH_INFO.LOG_MANAGE.id,
      auth_name: '日志管理',
      auth_value: DEFAULT_AUTH_INFO.LOG_MANAGE.auth_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_AUTH_INFO.ALL_AUTH.id,
    }
  ];

  return deafultAuth;
};

const initRole = () => {
  const defaultRole: IRole[] = [
    {
      id: DEFAULT_ROLE_INFO.ALL_ROLE.id,
      role_name: '全部角色',
      role_value: DEFAULT_ROLE_INFO.ALL_ROLE.role_value,
      type: 1,
      priority: 99,
      p_id: 0,
    },
    {
      id: DEFAULT_ROLE_INFO.ADMIN.id,
      role_name: '管理员',
      role_value: DEFAULT_ROLE_INFO.ADMIN.role_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_ROLE_INFO.ALL_ROLE.id,
    },
    {
      id: DEFAULT_ROLE_INFO.SUPER_ADMIN.id,
      role_name: '超级管理员',
      role_value: DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_ROLE_INFO.ADMIN.id,
    },
    {
      id: DEFAULT_ROLE_INFO.USER.id,
      role_name: '用户',
      role_value: DEFAULT_ROLE_INFO.USER.role_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_ROLE_INFO.ALL_ROLE.id,
    },
    {
      id: DEFAULT_ROLE_INFO.VIP_USER.id,
      role_name: 'VIP用户',
      role_value: DEFAULT_ROLE_INFO.VIP_USER.role_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_ROLE_INFO.USER.id,
    },
    {
      id: DEFAULT_ROLE_INFO.SVIP_USER.id,
      role_name: 'SVIP用户',
      role_value: DEFAULT_ROLE_INFO.SVIP_USER.role_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_ROLE_INFO.USER.id,
    },
    {
      id: DEFAULT_ROLE_INFO.TOURIST_USER.id,
      role_name: '游客',
      role_value: DEFAULT_ROLE_INFO.TOURIST_USER.role_value,
      type: 1,
      priority: 99,
      p_id: DEFAULT_ROLE_INFO.USER.id,
    },
  ];
  return defaultRole;
};

const initRoleAuth = () => {
  const auth = initAuth();
  const roleAuth: any = [];
  let id = 0;
  auth.forEach((v) => {
    id += 1;
    roleAuth.push({
      id,
      role_id: 1,
      auth_id: v.id,
    });
  });

  [
    DEFAULT_AUTH_INFO.AUTH_MANAGE,
    DEFAULT_AUTH_INFO.ROLE_MANAGE,
    DEFAULT_AUTH_INFO.USER_MANAGE,
    DEFAULT_AUTH_INFO.MESSAGE_MANAGE,
    DEFAULT_AUTH_INFO.MESSAGE_SEND,
    DEFAULT_AUTH_INFO.MESSAGE_DISABLE,
  ].forEach((item) => {
    id += 1;
    roleAuth.push({
      id,
      role_id: DEFAULT_ROLE_INFO.SUPER_ADMIN.id,
      auth_id: item.id,
    });
  });

  [
    DEFAULT_AUTH_INFO.USER_MANAGE,
    DEFAULT_AUTH_INFO.MESSAGE_MANAGE,
    DEFAULT_AUTH_INFO.MESSAGE_SEND,
    DEFAULT_AUTH_INFO.MESSAGE_DISABLE,
  ].forEach((item) => {
    id += 1;
    roleAuth.push({
      id,
      role_id: DEFAULT_ROLE_INFO.LIVE_ADMIN.id,
      auth_id: item.id,
    });
  });

  [
    DEFAULT_AUTH_INFO.MESSAGE_SEND,
  ].forEach((item) => {
    id += 1;
    roleAuth.push({
      id,
      role_id: DEFAULT_ROLE_INFO.SVIP_USER.id,
      auth_id: item.id,
    });
  });

  [
    DEFAULT_AUTH_INFO.MESSAGE_SEND,
  ].forEach((item) => {
    id += 1;
    roleAuth.push({
      id,
      role_id: DEFAULT_ROLE_INFO.VIP_USER.id,
      auth_id: item.id,
    });
  });


  return roleAuth;
};

export const bulkCreateGoods: IGoods[] = [
  {
    name: 'cái này thay lại thành 2.000.000vnd',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'du lịch phú quốc',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'du lịch Trung Quốc',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'thẻ hội viên',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'nước hoa',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'Vouchar 500.0',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'Vouchar 50.0',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'voucher 20.0',
    desc: 'description',
    price: 100000,
  },
  {
    name: 'voucher 10.0',
    desc: 'description',
    price: 100000,
  },
];




export const bulkCreateRole = initRole();
export const bulkCreateAuth = initAuth();
export const bulkCreateRoleAuth = initRoleAuth();
