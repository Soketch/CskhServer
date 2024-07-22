import { IRole, IAuth } from '@/interface';

/** 用户状态 */
export enum UserStatusEnum {
    /** 正常 */
    normal,
    /** 禁用 */
    disable,
}

/**机器人账号 */
export enum UserIsRobotEnum {
    yes,
    no,
}
/**
 * 是否可以发言
 */
export enum UserCanMsgEnum {
    yes,
    no,
}

export interface IEmailUser {
    id?: number;
    email?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: any;
}


/** 用户信息 */
export interface IUser {
    id?: number;
    username?: string; //用户名
    useremail?: IEmailUser; //用户邮箱
    password?: string; //密码
    balance?: number; //余额
    integral?: number; //积分
    status?: UserStatusEnum; //用户状态
    avatar?: string;  //头像
    profileImg?: string;  //主页照片
    desc?: string;  //个人简介
    token?: string;
    roles?: IRole[];
    auths?: IAuth[];

    user_roles?: number[];
    is_robot?: UserIsRobotEnum; //是否为机器人账号
    can_msg?: UserCanMsgEnum; //是否可以发言
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

/** 用户社交信息 */
export interface IUserSocial {
    id?: number;
    user_id?: number;
    desc?: string;         // 个人简介
    profileImgs?: string[];   // 主页照片
    videoUrl?: string[];   // 视频链接数组
    websiteUrl?: string;   // 个人网站链接
    socialLinks?: {        // 社交媒体链接
        telegram?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}