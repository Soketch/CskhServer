import path from 'path';

import {
  DEFAULT_ROLE_INFO,
} from '@/constant';
import { IInitUser } from '@/interface';

export const initUser: Record<string, IInitUser> = {
  admin: {
    id: 1,
    username: 'admin',
    avatar: `https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images`,
    user_roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.id],
  },
  systemUser1: {
    id: 2,
    username: 'CoCo',
    user_roles: [DEFAULT_ROLE_INFO.LIVE_ADMIN.id],
    avatar: `https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images`,
  },
  systemUser2: {
    id: 3,
    username: 'Dukoo',
    avatar: `https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images`,
    user_roles: [DEFAULT_ROLE_INFO.SVIP_USER.id],
  },
  systemUser3: {
    id: 4,
    username: 'MoonTIT',
    avatar: `https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images`,
    user_roles: [DEFAULT_ROLE_INFO.VIP_USER.id],
  },
  systemUser4: {
    id: 5,
    username: 'Nill',
    avatar: `https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images`,
    user_roles: [DEFAULT_ROLE_INFO.VIP_USER.id],
  },
  systemUser5: {
    id: 6,
    username: 'Ojin',
    avatar: `https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images`,
    user_roles: [DEFAULT_ROLE_INFO.VIP_USER.id],

  },
};
