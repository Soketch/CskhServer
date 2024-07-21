import { IUser } from '@/types/IUser';


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