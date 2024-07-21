import { spawnSync } from 'child_process';
import os from 'os';
import path from 'path';

/**
 * 获取日期当天的开始时间到结束时间
 */
export function dateStartAndEnd(date: Date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const startTime = `${y}-${m}-${d} 00:00:00`;
    const endTime = `${y}-${m}-${d} 23:59:59`;
    return {
        startTime,
        endTime,
    };
}

export function getStars(count: number) {
    return '*'.repeat(count);
}

/**
 * 获取最近一周
 */
export const getLastestWeek = () => {
    const oneDay = 1000 * 60 * 60 * 24;
    const endDate = +new Date();
    const startDate = endDate - oneDay * 7;
    return { startDate, endDate };
};

/**
 * @description 格式化内存大小（要求传入的数字以byte为单位）
 * @param {number} val
 * @param {*} num 显示几位小数，默认2
 * @return {*}
 */
export const formatMemorySize = (val: number, num = 2) => {
    // bit:"比特"或"位",1byte=8bit
    const oneByte = 1;
    const oneKb = oneByte * 1024;
    const oneMb = oneKb * 1024;
    const oneGb = oneMb * 1024;
    const oneTb = oneGb * 1024;
    const format = (v: number) => v.toFixed(num);
    if (val < oneKb) {
        return `${format(val / oneByte)}byte`;
    }
    if (val < oneMb) {
        return `${format(val / oneKb)}kb`;
    }
    if (val < oneGb) {
        return `${format(val / oneMb)}mb`;
    }
    if (val < oneTb) {
        return `${format(val / oneGb)}gb`;
    }
    return `${format(val / oneTb)}tb`;
};

/**
 * 获取当前机器的ip地址
 */
export function getIpAddress() {
    const interfaces = os.networkInterfaces();
    const res: string[] = [];
    Object.keys(interfaces).forEach((dev) => {
        const iface = interfaces[dev];
        if (iface) {
            for (let i = 0; i < iface.length; i += 1) {
                const { family, address } = iface[i];
                if (family === 'IPv4') {
                    res.push(address);
                }
            }
        }
    });
    return res;
}

/** 延迟执行 */
export const delayByPromise = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('ok');
        }, delay);
    });
};

export function dockerIsInstalled() {
    const res = spawnSync('docker', ['-v']);
    if (res.status !== 0) {
        return false;
    }
    return true;
}

export const filterObj = (obj: Record<string, any>, keyArr: string[]) => {
    const res: Record<string, any> = {};
    Object.keys(obj).forEach((item) => {
        if (!keyArr.includes(item)) {
            res[item] = obj[item];
        }
    });
    return res;
};
const appDir = process.cwd();
export const resolveApp = (relativePath : string) => {
    return path.join(appDir, relativePath);
    // return path.join(__dirname, '../../', relativePath);
};

/**
 * @description: 处理free命令返回的内存信息
 * @param {string} str
 * @return {*}
 */
export const handleData = (str: string) => {
    const arr = str.match(/\S+/g)!;

    const mem = 'Mem:';
    const swap = 'Swap:';
    const res: any = [];
    const obj: any = {};

    res.push(arr.splice(0, 6));
    res.push(arr.splice(0, 7));
    res.push(arr.splice(0, arr.length));

    res[0].forEach((key: string, index: number) => {
        res[1][index + 1] && (obj[mem + key] = res[1][index + 1]);
        res[2][index + 1] && (obj[swap + key] = res[2][index + 1]);
    });
    return obj;
};

export const replaceKeyFromValue = (str: string, obj:Record<string, string>) => {
    let res = str;
    Object.keys(obj).forEach((v) => {
        res = res.replace(new RegExp(`{${v}}`, 'ig'), obj[v]);
    });
    return res;
};

export const getFileExt = (name: string) => {
    const arr = name.split('.');
    const ext = arr[arr.length - 1];
    return ext;
};

/** 处理返回的分页数据 */
export const handlePaging = <T>(
    result: any,
    nowPage?: string,
    pageSize?: string
) => {
    // @ts-ignore
    const obj: {
        nowPage: number;
        pageSize: number;
        hasMore: boolean;
        total: number;
        rows: T[];
    } = {};
    obj.nowPage = nowPage ? +nowPage : 1;
    obj.pageSize = pageSize ? +pageSize : result.count;
    obj.hasMore = obj.nowPage * obj.pageSize - result.count < 0;
    obj.total = result.count;
    obj.rows = result.rows;
    return obj;
};

/** 处理返回的分页数据 */
export const handleGroupPaging = <T>(
    result: { count: any[]; rows: any[] },
    nowPage?: string,
    pageSize?: string
) => {
    // @ts-ignore
    const obj: {
        nowPage: number;
        pageSize: number;
        hasMore: boolean;
        total: number;
        rows: T[];
    } = {};
    obj.nowPage = nowPage ? +nowPage : 1;
    obj.pageSize = pageSize ? +pageSize : result.count.length;
    obj.hasMore = obj.nowPage * obj.pageSize - result.count.length < 0;
    obj.total = result.count.length;
    obj.rows = result.rows;
    return obj;
};

/**
 * @param code 验证码
 * @param desc 验证码作用
 * @param exp 有效期，单位：秒，但返回时会转换成分钟
 */
export const emailContentTemplate = ({
    code,
    desc,
    exp,
    subject,
}: {
    code: string;
    desc: string;
    exp: number;
    subject?: string;
}) => {
    const subjectTemp = subject || `【cskh】verify code：${code}`;
    const content = `【cskh】verify code：${code}，this code is used for ${desc}，it will expire in ${exp / 60
        } minutes,.`;
    return { subject: subjectTemp, content };
};



/**
 * 扁平化数据转树型
 */
export const arrayToTree = ({
    originArr = [],
    originPid = 1,
    originIdKey = 'id',
    originPidKey = 'pid',
    resChildrenKey = 'children',
    resIdKey = undefined,
    resPidKey = undefined,
}: {
    originArr: any[];
    originPid: number;
    originIdKey: string;
    originPidKey: string;
    resChildrenKey: string;
    resIdKey?: string;
    resPidKey?: string;
}) => {
    // eslint-disable-next-line no-shadow
    const handleToTree = (arr: any[], pid: number) => {
        // 循环，获取该id的children
        function loop(_pid: number) {
            // 保存得到的数据
            const res: any = [];
            // 遍历原数组
            for (let i = 0; i < arr.length; i += 1) {
                const item = arr[i];
                if (resIdKey && item[originIdKey] !== undefined) {
                    item[resIdKey] = item[originIdKey];
                    delete item[originIdKey];
                }
                if (resPidKey && item[originPidKey] !== undefined) {
                    item[resPidKey] = item[originPidKey];
                    delete item[originPidKey];
                }

                const currentPidKey = resPidKey ? item[resPidKey] : item[originPidKey];
                const currentIdKey = resIdKey ? item[resIdKey] : item[originIdKey];

                if (currentPidKey === _pid) {
                    // @ts-ignore
                    const children = loop(currentIdKey);
                    if (children.length) item[resChildrenKey] = children;
                    // 如果当前item的p_id等于目标_pid，则将这个item插入res
                    res.push(item);
                }
            }
            return res;
        }

        return loop(pid);
    };

    const data = JSON.parse(JSON.stringify(originArr));
    return handleToTree(data, originPid);
};
/**
在访问 resPidKey 和 resIdKey 之前，首先检查它们是否存在。
如果存在，则使用 item[resPidKey] 和 item[resIdKey]，
否则使用 item[originPidKey] 和 item[originIdKey]。

变量代替直接访问: 将 resPidKey 和 resIdKey 的值
分别存储在 currentPidKey 和 currentIdKey 中，
以便在后续的访问中使用。
*/



/**
 * 判断是否为纯数字
 * @param value 任意值
 * @returns 布尔值，表示是否为纯数字
 */
export function isPureNumber(value: any): boolean {
    return /^[0-9]+$/.test(value);
}


/**
 * 生成指定长度的随机字符串
 * @param length 字符串的长度
 * @returns 随机生成的字符串
 */
export function getRandomString(length: number): string {
    // 字符串包含的字符集
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // 生成随机字符串
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}