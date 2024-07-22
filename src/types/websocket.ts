
import { IUser } from '@/types/IUser';

/** websocket连接状态 */
export enum WsConnectStatusEnum {
  /** 已连接 */
  connection = 'connection',
  /** 连接中 */
  connecting = 'connecting',
  /** 已连接 */
  connected = 'connected',
  /** 断开连接中 */
  disconnecting = 'disconnecting',
  /** 已断开连接 */
  disconnect = 'disconnect',
  /** 重新连接 */
  reconnect = 'reconnect',
  /** 客户端的已连接 */
  connect = 'connect',
}

/** websocket消息类型 */
export enum WsMsgTypeEnum {
  /** 用户进入聊天 */
  join = 'join',
  /** 用户进入聊天完成 */
  joined = 'joined',
  /** 用户进入聊天 */
  otherJoin = 'otherJoin',
  /** 用户退出聊天 */
  leave = 'leave',
  /** 用户退出聊天完成 */
  leaved = 'leaved',
  /** 用户发送消息 */
  message = 'message',

  /** 获取在线用户 */
  getLiveUser = 'getLiveUser',
  /** 更新加入信息 */
  updateJoinInfo = 'updateJoinInfo',
  /** 心跳 */
  heartbeat = 'heartbeat',
}


/** WebSocket消息格式 */
export interface IWsFormat<T> {
  /** 消息id */
  request_id: string;
  /** 用户socket_id */
  socket_id: string;
  /** 用户信息 */
  user_info?: IUser;
  /** 用户id */
  user_id?: number;
  /** 用户token */
  user_token?: string;
  /** 消息数据 */
  data: T;
}

export interface IMessageData {
  /** 消息内容 */
  content: string;
  /** 消息类型，例如文本、图片、文件等 */
  messageType: 'text' | 'image' | 'file';
  /** 发送时间 */
  timestamp: string;
}

export type IMessageWsFormat = IWsFormat<IMessageData>;


/** WebSocket错误类型 */
export enum WsErrorTypeEnum {
  /** 连接错误 */
  CONNECTION_ERROR = 'connectionError',
  /** 认证错误 */
  AUTH_ERROR = 'authError',
  /** 消息格式错误 */
  MESSAGE_FORMAT_ERROR = 'messageFormatError',
  /** 其他错误 */
  OTHER_ERROR = 'otherError',
}



