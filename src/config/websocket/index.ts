import { Server, Socket } from 'socket.io';
import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
import {
  WsConnectStatusEnum,
  WsMsgTypeEnum,
  IMessageWsFormat,
  IMessageData,
  WsErrorTypeEnum,
} from '@/types/websocket';
import { chalkINFO, chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

// 获取Socket的真实IP地址
export function getSocketRealIp(socket: Socket): string {
  if (!socket) {
    return '-1';
  }
  const realIp = socket.handshake.headers['x-real-ip'] as string;
  return realIp || '-1';
}

/**
 * 获取特定客户端的Socket对象
 * @param {Server} io - Socket.IO服务器实例
 * @param {string} clientId - 客户端的唯一标识符（如Socket ID）
 * @returns {Socket | undefined} - 对应的客户端Socket对象，如果不存在则返回undefined
 */
export function getSocketById(io: Server, clientId: string): Socket | undefined {
  return io.sockets.sockets.get(clientId);
}

/**
 * 获取所有连接的socket客户端
 * @param {Server} io - Socket.IO服务器实例
 * @returns {Promise<{ id: string, rooms: string[] }[]>} - 包含所有连接的Socket信息的数组
 */
export async function getAllSockets(io: Server): Promise<{ id: string, rooms: string[] }[]> {
  const allSockets = await io.fetchSockets();
  return Array.from(allSockets).map(socket => ({
    id: socket.id,
    rooms: Array.from(socket.rooms),
  }));
}

export const wsSocket: { io?: Server } = {
  io: undefined,
};

/**
 * 向客户端发送消息
 * @param {Object} params - 发送消息的参数
 * @param {Server} params.io - Socket.IO服务器实例
 * @param {number} [params.roomId] - 房间ID（可选）
 * @param {WsMsgTypeEnum} params.msgType - 消息类型
 * @param {T} [params.data] - 消息数据（可选）
 */
export function ioEmit<T>({
  io,
  roomId,
  msgType,
  data,
}: {
  io: Server;
  roomId?: number;
  msgType: WsMsgTypeEnum;
  data?: T;
}) {
  try {
    if (roomId) {
      io.to(`${roomId}`).emit(msgType, data);
    } else {
      io.emit(msgType, data);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 初始化WebSocket连接
 * @param {any} server - HTTP服务器实例
 */
export const connectWebSocket = (server: any) => {
  if (PROJECT_ENV === PROJECT_ENV_ENUM.beta) {
    console.log(chalkWARN('当前是beta环境，不初始化websocket'));
    return;
  }
  console.log(chalkSUCCESS('初始化websocket成功！'));

  const oneK = 1000;
  const io = new Server(server, {
    maxHttpBufferSize: oneK * 1000 * 100,
    // parser: customParser,
  });

  wsSocket.io = io;

  /**
   * 格式化并输出Socket信息日志
   * @param {Object} data - 日志数据
   * @param {string} data.msg - 消息内容
   * @param {Socket} data.socket - 客户端Socket对象
   * @param {number} [data.roomId] - 房间ID（可选）
   */
  function prettierInfoLog(data: {
    msg: string;
    socket: Socket;
    roomId?: number;
  }) {
    console.log(
      chalkINFO(
        `${data.msg}, roomId: ${data.roomId || ''}, socketId: ${data.socket.id}, socketIp: ${getSocketRealIp(data.socket)}`
      )
    );
  }

  // 添加 WebSocket 连接事件处理
  io.on('connection', (socket: Socket) => {
    console.log(chalkSUCCESS(`Socket ${socket.id} connected.`));
    prettierInfoLog({ msg: 'Client connected', socket });

    socket.on('disconnect', () => {
      console.log(chalkWARN(`Socket ${socket.id} disconnected.`));
      prettierInfoLog({ msg: 'Client disconnected', socket });
    });
  });
};
