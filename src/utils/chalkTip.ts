// 导入 `chalk` 模块，用于在终端中添加颜色和样式
import nodeChalk from 'chalk';
// 导入 `node-emoji` 模块，用于在终端中处理 emoji 表情
import nodeEmoji from 'node-emoji';

// 导出 `node-emoji` 实例，方便在其他模块中使用 emoji
export const emoji = nodeEmoji;

// 导出 `chalk` 实例，方便在其他模块中使用颜色和样式
export const chalk = nodeChalk;

// 定义一个函数 `chalkINFO`，用于格式化 INFO 类型的日志消息
// 使用背景色蓝色和黑色文本色显示时间戳和 INFO 标签
// 使用蓝色亮色显示消息内容
export const chalkINFO = (v: any) =>
    `${chalk.bgBlueBright.black(
        `[${new Date().toLocaleString()}]  INFO   `
    )} ${chalk.blueBright(v)}`;

// 定义一个函数 `chalkSUCCESS`，用于格式化 SUCCESS 类型的日志消息
// 使用背景色绿色和黑色文本色显示时间戳和 SUCCESS 标签
// 使用绿色亮色显示消息内容
export const chalkSUCCESS = (v: any) =>
    `${chalk.bgGreenBright.black(
        `[${new Date().toLocaleString()}] SUCCESS `
    )} ${chalk.greenBright(v)}`;

// 定义一个函数 `chalkERROR`，用于格式化 ERROR 类型的日志消息
// 使用背景色红色和黑色文本色显示时间戳和 ERROR 标签
// 使用红色亮色显示消息内容
export const chalkERROR = (v: any) =>
    `${chalk.bgRedBright.black(
        `[${new Date().toLocaleString()}]  ERROR  `
    )} ${chalk.redBright(v)}`;

// 定义一个函数 `chalkWARN`，用于格式化 WARN 类型的日志消息
// 使用背景色橙色和黑色文本色显示时间戳和 WARN 标签
// 使用橙色亮色显示消息内容
export const chalkWARN = (v: any) =>
    `${chalk
        .bgHex('#FFA500')  // 背景色设置为橙色
        .black(`[${new Date().toLocaleString()}]  WARN   `)} ${chalk.hex('#FFA500')(
            v
    )}`;
