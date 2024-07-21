/**
 * websocket 相关类型定义
 */

interface IMsg{
    type: string;
    massage: string;
}

interface INode{
    id: number;
    list: IMsg[];
}

// from
// to
// type
interface websocket{
    send: (msg: IMsg) => string;

    on: (type: string, callback: (msg: IMsg) => void) => void;

    close: () => void;
}