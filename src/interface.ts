import { IUser } from '@/types/IUser';
import {} from '@/types/websocket'

// 抽奖商品
export interface IGoods {
    id?: number;
    name?: string;
    desc?: string;
    price?: number;  // 价格
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


// 注册用户信息记录
export interface ISigninRecord {
    id?: number;
    user_id?: number;
    /** 用户信息 */
    username?: string;
    user?: IUser;

    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


export enum FormTypeEnum {
    'input' = 'input',
    'password' = 'password',
    'number' = 'number',
    'select' = 'select',
    'radio' = 'radio',
    'checkbox' = 'checkbox',
    'markdown' = 'markdown',
    'switch' = 'switch',
    'upload' = 'upload',
    'treeSelect' = 'treeSelect',
    'datePicker' = 'datePicker',
}


// 系统设置
export interface ISettings {
    id?: number;
    key?: string;
    value?: string;
    desc?: string;
    type?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


export interface IEmail {
    id?: number;
    email?: string;
    code?: string;
    exp?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface ILog {
    id?: number;
    user_id?: number;
    api_user_agent?: string;
    api_duration?: number;
    api_forwarded_for?: string;
    api_referer?: string;
    api_real_ip?: string;
    api_host?: string;
    api_hostname?: string;
    api_method?: string;
    api_path?: string;
    api_query?: string;
    api_body?: string;
    api_status_code?: number;
    api_error?: string;
    api_err_msg?: string;
    api_err_code?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface IAuth {
    id?: number;
    p_id?: number;
    auth_name?: string;
    auth_value?: string;
    type?: number;
    priority?: number;
    c_auths?: number[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

// 角色
export interface IRole {
    id?: number;
    p_id?: number;
    role_name?: string;
    role_value?: string;
    type?: number;
    priority?: number;
    role_auths?: number[];
    c_roles?: number[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
// 角色权限
export interface IRoleAuth {
    id?: number;
    role_id?: number;
    auth_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


// 列表接口
export type IList<T> = {
    nowPage?: string; // 当前页
    pageSize?: string; // 每页条数
    orderBy?: string;  // 排序字段
    orderName?: string;  // 排序方式
    keyWord?: string;   // 搜索关键字
    rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';  // 时间范围类型
    rangTimeStart?: string;  // 开始时间
    rangTimeEnd?: string;  // 结束时间
} & T; 

export interface IUserRole {
    id?: number;
    user_id: number;
    role_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


export interface IDayData {
    id?: number;
    day: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface IHourData {
    id?: number;
    hour: string;

    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface IMinuteData {
    id?: number;
    minute: string;

    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


export interface IInitUser extends IUser {
    user_roles: number[];
}

export interface IBlacklist {
    id?: number;
    ip?: string;
    user_id?: number;
    type?: number;
    msg?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


/** 
 * WebSocket消息文件标识枚举
 * @enum {number} 
 */
export enum WsMessageMsgIsFileEnum {
    /** 消息包含文件 */
    yes = 1,
    /** 消息不包含文件 */
    no = 0,
}

/** 
 * WebSocket消息是否显示标识枚举
 * @enum {number} 
 */
export enum WsMessageMsgIsShowEnum {
    /** 消息可见 */
    yes = 1,
    /** 消息不可见 */
    no = 0,
}

/** 
 * WebSocket消息是否经过验证标识枚举
 * @enum {number} 
 */
export enum WsMessageMsgIsVerifyEnum {
    /** 消息已验证 */
    yes = 1,
    /** 消息未验证 */
    no = 0,
}

/** 
 * WebSocket消息接口
 * @interface
 */
export interface IWsMessage {
    /** 消息ID */
    id?: number;
    /** 用户名 */
    username?: string;
    /** 原始用户名（消息来源） */
    origin_username?: string;
    /** 消息内容 */
    content?: string;
    /** 原始消息内容（消息来源） */
    origin_content?: string;
    /** 用户ID */
    user_id?: number;
    /** 用户IP地址 */
    ip?: string;
    /** 消息是否包含文件标识 */
    msg_is_file?: WsMessageMsgIsFileEnum;
    msg_type?: ChatMsgTypeEnum; // 消息类型 聊天消息
    /** 用户代理（浏览器信息） */
    user_agent?: string;
    /** 消息发送时间戳 */
    send_msg_time?: number;
    /** 消息是否显示标识 */
    is_show?: WsMessageMsgIsShowEnum;
    /** 消息是否经过验证标识 */
    is_verify?: WsMessageMsgIsVerifyEnum;
    /** 用户信息（可选） */
    user?: IUser;
    /** 创建时间 */
    created_at?: string;
    /** 更新时间 */
    updated_at?: string;
    /** 删除时间（用于软删除） */
    deleted_at?: string;
}


export enum ChatMsgTypeEnum {
    chatMsg,
    otherJoin,
    userLeaved,
    system,
}


// 喜欢/关注关系接口
export interface UserFollow {
    id?: number;
    user_id?: number; //
    followerId?: number; // 关注者用户的ID
    followedId?: number; // 被关注者用户的ID
}

// 喜欢关系接口
export interface UserLike {
    id?: number;
    user_id?: number; 
    likeId?: number; // 喜欢关系的唯一标识符（可选）
    likedId?: number; // 被喜欢的用户ID
}

// 可以为用户添加喜欢/关注字段
export interface UserWithRelations {
    following?: IUser[]; // 当前用户关注的用户列表
    followers?: IUser[]; // 当前用户的粉丝列表
    likes?: IUser[]; // 当前用户喜欢的用户列表
    likedBy?: IUser[]; // 当前用户被喜欢的用户列表
}
