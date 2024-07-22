import { resolveApp } from './utils';

/** 消息最大长度 */
export const MSG_MAX_LENGTH = 150;
export const MAX_TOKEN_EXP = 24 * 90; // token过期时间：90天





export const COMMON_ERROR_CODE = {
    serverError: 10000, // 服务器错误
    banIp: 1000, // 黑名单禁用了ip
    adminDisableUser: 1001, // 管理员禁用了用户
    notFound: 1002, // 返回了404的http状态码
    errStatusCode: 1003, // 返回了即不是200也不是404的http状态码
    shutdown: 1004, // 停机维护
    idOrPwdError: 1005, // 账号或密码错误！
    usernameOrPwdError: 1006, // 用户名或密码错误！
    todayAlreadySignin: 1007, // 今天已签到过了！
    alreadyGetRedbag: 1008, // 今天已签到过了！
    redbagAlreadySnatched: 1009, // 红包已经被抢完！
    balanceNotEnough: 1010, // 余额不足
};

export const COMMON_HTTP_CODE = {
    success: 200, // 成功
    apiCache: 304, // 接口缓存
    paramsError: 400, // 参数错误
    unauthorized: 401, // 未授权
    forbidden: 403, // 权限不足
    notFound: 404, // 未找到
    methodNotAllowed: 405, // 方法不允许，如：服务端提供了一个get的/api/list接口，但客户端却post了/api/list接口
    serverError: 500, // 服务器错误
};

export const COMMON_ERROE_MSG = {
    banIp: '此ip已被禁用，请联系管理员处理！', // 此ip已被禁用，请联系管理员处理！
    jwtExpired: '登录信息过期！', // 登录信息过期！
    invalidToken: '非法token！', // 非法token！
    adminDisableUser: '你的账号存在异常', // 你的账号已被管理员禁用，请联系管理员处理！ //
    shutdown: '停机维护中', // 停机维护中

    noLogin: '未登录', // 未登录
    paramsError: '参数错误！', // 参数错误！
    unauthorized: '未授权！', // 未授权！
    forbidden: '权限不足！', // 权限不足！
    notFound: '未找到！', // 未找到！
    serverError: '服务器错误！', // 服务器错误！
    idOrPwdError: '账号或密码错误！', // 账号或密码错误！
    usernameOrPwdError: '用户名或密码错误！', // 用户名或密码错误！
    todayAlreadySignin: '今天已签到过了！', // 今天已签到过了！
    alreadyGetRedbag: '你已经领取过红包', // 你已经领取过红包
    redbagAlreadySnatched: '红包已经被抢完！', // 红包已经被抢完！
};

export const COMMON_SUCCESS_MSG = {
    GET: '获取成功！',
    POST: '新增成功！',
    PUT: '修改成功！',
    DELETE: '删除成功！',

    loginSuccess: '登录成功！',
};

export const COMMON_ERR_MSG = {
    banIp: '此ip已被禁用，请联系管理员处理！',
    jwtExpired: '登录信息过期！',
    invalidToken: '非法token！',
    adminDisableUser: '你的账号存在异常！', // 你的账号已被管理员禁用，请联系管理员处理！
    shutdown: '停机维护中~',
};


export enum PROJECT_ENV_ENUM {
    development = 'development', // 开发环境
    prod = 'prod', // 生产环境
    beta = 'beta', // 预发布环境
}

export const PROJECT_ALIAS = process.env
    .NODE_APP_RELEASE_PROJECT_ALIAS as string;
export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string;
export const PROJECT_ENV = process.env
    .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM;
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string;
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string;


export const UPLOAD_DIR =
    PROJECT_ENV === PROJECT_ENV_ENUM.prod
        ? resolveApp('/dist/upload/')
        : resolveApp('/upload/'); // 上传文件接口接收到的文件存放的目录


export const STATIC_DIR =
    PROJECT_ENV === PROJECT_ENV_ENUM.prod
        ? resolveApp('/dist/public/')
        : resolveApp('/public/'); // 静态文件目录


export const DEFAULT_AUTH_INFO = {
    ALL_AUTH: {
        id: 1,
        auth_value: 'ALL_AUTH',
    },
    USER_MANAGE: {
        id: 2,
        auth_value: 'USER_MANAGE',  //用户控制
    },
    ROLE_MANAGE: {
        id: 3,
        auth_value: 'ROLE_MANAGE',  //角色控制
    },
    AUTH_MANAGE: {
        id: 4,
        auth_value: 'AUTH_MANAGE', //权限控制
    },
    MESSAGE_MANAGE: {
        id: 5,
        auth_value: 'MESSAGE_MANAGE', //消息控制
    },
    MESSAGE_SEND: {
        id: 6,
        auth_value: 'MESSAGE_SEND', //消息发送
    },
    MESSAGE_DISABLE: {
        id: 7,
        auth_value: 'MESSAGE_DISABLE', //消息禁用
    },
    LOG_MANAGE: {
        id: 8,
        auth_value: 'LOG_MANAGE', //日志管理
    }
};

export const DEFAULT_ROLE_INFO = {
    ALL_ROLE: {
        id: 1,
        role_value: 'ALL_ROLE',
    },
    ADMIN: {
        id: 2,
        role_value: 'ADMIN',
    },
    SUPER_ADMIN: {
        id: 3,
        role_value: 'SUPER_ADMIN',
    },
    LIVE_ADMIN: {
        id: 4,
        role_value: 'LIVE_ADMIN',
    },
    USER: {
        id: 5,
        role_value: 'USER',
    },
    VIP_USER: {
        id: 6,
        role_value: 'VIP_USER',
    },
    SVIP_USER: {
        id: 7,
        role_value: 'SVIP_USER',
    },
    TOURIST_USER: {
        id: 8,
        role_value: 'TOURIST_USER',
    },
};

export const BLACKLIST_TYPE = {
    banIp: 1, // 频繁操作
    adminDisableUser: 2, // 被管理员禁用
};

export const SCHEDULE_TYPE = {
    verifyStream: 'handleVerifyStream',
    blobIsExist: 'blobIsExist',
};


export const REDIS_PREFIX_ENV = `${PROJECT_NAME}-${PROJECT_ENV}-`;

// redis前缀
export const REDIS_PREFIX = {
    emailLogin: `${REDIS_PREFIX_ENV}emailLogin___`, // 邮箱登录
    emailRegister: `${REDIS_PREFIX_ENV}emailRegister___`, // 邮箱注册
    userBindEmail: `${REDIS_PREFIX_ENV}userBindEmail___`, // 用户绑定邮箱
    userCancelBindEmail: `${REDIS_PREFIX_ENV}userCancelBindEmail___`, // 用户取消绑定邮箱
    order: `${REDIS_PREFIX_ENV}order___`, // 订单
    fileProgress: `${REDIS_PREFIX_ENV}fileProgress___`, // 文件上传进度
    qrCodeLogin: `${REDIS_PREFIX_ENV}qrCodeLogin___`, // 二维码登录
    deskUserUuid: `${REDIS_PREFIX_ENV}deskUserUuid___`,
    deskUserSocketid: `${REDIS_PREFIX_ENV}deskUserSocketid___`,
};