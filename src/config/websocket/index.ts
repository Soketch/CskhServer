// import { Server, Socket } from 'socket.io';


// import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
// import {
//   WsAnswerType,
//   WsBatchSendOffer,
//   WsCandidateType,
//   WsConnectStatusEnum,
//   WsDisableSpeakingType,
//   WsGetLiveUserType,
//   WsHeartbeatType,
//   WsJoinType,
//   WsMessageType,
//   WsMsgTypeEnum,
//   WsMsrBlobType,
//   WsOfferType,
//   WsRemoteDeskBehaviorType,
//   WsRoomNoLiveType,
//   WsStartLiveType,
//   WsStartRemoteDesk,
//   WsUpdateJoinInfoType,
//   WsUpdateLiveRoomCoverImg,
// } from '@/types/websocket';

// import { chalkINFO, chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

// export function getSocketRealIp(socket: Socket) {
//   if (!socket) {
//     return '-1';
//   }
//   const realIp = socket.handshake.headers['x-real-ip'] as string;
//   return realIp || '-1';
// }

// // 获取所有连接的socket客户端
// async function getAllSockets(io) {
//   const allSocketsMap = await io.fetchSockets();
//   const res = Object.keys(allSocketsMap).map((item) => {
//     return {
//       id: allSocketsMap[item].id,
//       rooms: [...allSocketsMap[item].rooms.values()],
//     };
//   });
//   return res;
// }

// // 获取某个房间的所有用户
// export async function getRoomAllUser(io, roomId: number) {
//   const res1 = await getAllSockets(io);
//   const res2 = res1.filter((item) => {
//     return item.rooms.includes(`${roomId}`);
//   });
//   return res2;
// }

// async function updateUserJoinedRoom(data: {
//   socketId: string;
//   liveRoomId: number;
//   roomLiving?: boolean;
//   clientIp: string;
// }) {
//   if (data.roomLiving) {
//     liveRedisController.setLiveRoomIsLiving({
//       socketId: data.socketId,
//       liveRoomId: data.liveRoomId,
//       client_ip: data.clientIp,
//     });
//   }
//   const res = await liveRedisController.getUserJoinedRoom({
//     socketId: data.socketId,
//     joinRoomId: data.liveRoomId,
//   });
//   if (res) {
//     liveRedisController.setUserJoinedRoom({
//       socketId: res.value.socketId,
//       joinRoomId: res.value.joinRoomId,
//       userInfo: res.value.userInfo,
//       created_at: res.created_at,
//       client_ip: data.clientIp,
//     });
//   }
// }

// export const wsSocket: { io?: Server } = {
//   io: undefined,
// };

// /**
//  * 有roomId，发送给roomId的出自己以外的其他人
//  * 没有roomId，发送给自己
//  */
// export function socketEmit<T>({
//   socket,
//   msgType,
//   roomId,
//   data,
// }: {
//   socket: Socket;
//   msgType: WsMsgTypeEnum;
//   roomId?: number;
//   data?: T;
// }) {
//   try {
//     // console.log('===== websocket socketEmit =====', roomId, socket.id, msgType);
//     if (roomId) {
//       socket.to(`${roomId}`).emit(msgType, data);
//     } else {
//       socket.emit(msgType, data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function ioEmit<T>({
//   io,
//   roomId,
//   msgType,
//   data,
// }: {
//   io: Server;
//   roomId?: number;
//   msgType: WsMsgTypeEnum;
//   data?: T;
// }) {
//   try {
//     // console.log('===== websocket ioEmit =====', roomId, msgType);
//     if (roomId) {
//       io.to(`${roomId}`).emit(msgType, data);
//     } else {
//       io.emit(msgType, data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const connectWebSocket = (server) => {
//   if (PROJECT_ENV === PROJECT_ENV_ENUM.beta) {
//     console.log(chalkWARN('当前是beta环境，不初始化websocket'));
//     return;
//   }
//   console.log(chalkSUCCESS('初始化websocket成功！'));
//   const oneK = 1000;
//   const io = new Server(server, {
//     maxHttpBufferSize: oneK * 1000 * 100,
//     // parser: customParser,
//   });

//   wsSocket.io = io;

//   function prettierInfoLog(data: {
//     msg: string;
//     socket: Socket;
//     roomId?: number;
//   }) {
//     console.log(
//       chalkINFO(
//         `${data.msg},roomId:${data.roomId || ''},socketId:${
//           data.socket.id
//         },socketIp:${getSocketRealIp(data.socket)}`
//       )
//     );
//   }

//   // socket.emit会将消息发送给发件人
//   // socket.broadcast.emit会将消息发送给除了发件人以外的所有人
//   // io.emit会将消息发送给所有人，包括发件人

//   // 每个客户端socket连接时都会触发 connection 事件
//   io.on(WsConnectStatusEnum.connection, (socket: Socket) => {
//     prettierInfoLog({ msg: 'connection', socket });
//     console.log('socket.roomss', socket.rooms);

//     // 收到用户进入房间
//     socket.on(WsMsgTypeEnum.join, (data: WsJoinType) => {
//       try {
//         const roomId = data.data.live_room_id;
//         prettierInfoLog({
//           msg: '收到用户进入房间',
//           socket,
//           roomId,
//         });
//         handleWsJoin({ io, socket, roomId, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到batchSendOffer
//     socket.on(WsMsgTypeEnum.batchSendOffer, (data: WsBatchSendOffer) => {
//       try {
//         const { roomId } = data.data;
//         prettierInfoLog({
//           msg: '收到batchSendOffer',
//           socket,
//           roomId: Number(roomId),
//         });
//         handleWsBatchSendOffer({ io, socket, roomId: Number(roomId), data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到主播开始直播
//     socket.on(WsMsgTypeEnum.startLive, (data: WsStartLiveType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到主播开始直播',
//           socket,
//         });
//         handleWsStartLive({ io, socket, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到主播断开直播
//     socket.on(WsMsgTypeEnum.roomNoLive, (data: WsRoomNoLiveType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到主播断开直播',
//           socket,
//           roomId: data.data.live_room.id,
//         });
//         handleWsRoomNoLive({ socket, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到用户获取当前在线用户
//     socket.on(WsMsgTypeEnum.getLiveUser, (data: WsGetLiveUserType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到用户获取当前在线用户',
//           socket,
//           roomId: data.data.live_room_id,
//         });
//         handleWsGetLiveUser({ socket, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到用户发送消息
//     socket.on(WsMsgTypeEnum.message, (data: WsMessageType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到用户发送消息',
//           socket,
//           roomId: data.data.live_room_id,
//         });
//         handleWsMessage({ io, socket, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到remoteDeskBehavior
//     socket.on(
//       WsMsgTypeEnum.remoteDeskBehavior,
//       (data: WsRemoteDeskBehaviorType) => {
//         try {
//           prettierInfoLog({
//             msg: '收到remoteDeskBehavior',
//             socket,
//             // @ts-ignore
//             roomId: data.data.roomId,
//           });
//           socketEmit({
//             // @ts-ignore
//             roomId: data.data.roomId,
//             socket,
//             msgType: WsMsgTypeEnum.remoteDeskBehavior,
//             data: data.data,
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     );

//     // 收到心跳
//     socket.on(WsMsgTypeEnum.heartbeat, (data: WsHeartbeatType) => {
//       // console.log('收到心跳', data);
//       try {
//         updateUserJoinedRoom({
//           socketId: data.data.socket_id,
//           liveRoomId: data.data.live_room_id,
//           roomLiving: data.data.roomLiving,
//           clientIp: getSocketRealIp(socket),
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到主播禁言用户
//     socket.on(WsMsgTypeEnum.disableSpeaking, (data: WsDisableSpeakingType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到主播禁言用户',
//           socket,
//         });
//         handleWsDisableSpeaking({ io, socket, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到更新加入信息
//     socket.on(WsMsgTypeEnum.updateJoinInfo, (data: WsUpdateJoinInfoType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到更新加入信息',
//           socket,
//           roomId: data.data.live_room_id,
//         });
//         handleWsUpdateJoinInfo({ socket, data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 收到更新直播间预览图
//     socket.on(
//       WsMsgTypeEnum.updateLiveRoomCoverImg,
//       (data: WsUpdateLiveRoomCoverImg) => {
//         try {
//           prettierInfoLog({
//             msg: '收到更新直播间预览图',
//             socket,
//           });
//           handleWsUpdateLiveRoomCoverImg(data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     );

//     // 收到startRemoteDesk
//     socket.on(WsMsgTypeEnum.startRemoteDesk, (data: WsStartRemoteDesk) => {
//       prettierInfoLog({
//         msg: '收到startRemoteDesk',
//         socket,
//         // @ts-ignore
//         roomId: data.data.roomId,
//       });
//       console.log(data);
//       handleWsStartRemoteDesk({ io, socket, data });
//     });

//     // 收到updateDeskUser
//     socket.on(WsMsgTypeEnum.updateDeskUser, (data: WsStartRemoteDesk) => {
//       handleWsUpdateDeskUser({ io, socket, data });
//     });

//     // 收到srsOffer
//     socket.on(WsMsgTypeEnum.srsOffer, (data: WsOfferType) => {
//       prettierInfoLog({
//         msg: '收到srsOffer',
//         socket,
//         roomId: data.data.live_room_id,
//       });
//       socketEmit<WsOfferType['data']>({
//         roomId: data.data.live_room_id,
//         socket,
//         msgType: WsMsgTypeEnum.srsOffer,
//         data: data.data,
//       });
//     });

//     // 收到srsAnswer
//     socket.on(WsMsgTypeEnum.srsAnswer, (data: WsAnswerType) => {
//       prettierInfoLog({
//         msg: '收到srsAnswer',
//         socket,
//         roomId: data.data.live_room_id,
//       });
//       socketEmit<WsAnswerType['data']>({
//         roomId: data.data.live_room_id,
//         socket,
//         msgType: WsMsgTypeEnum.srsAnswer,
//         data: data.data,
//       });
//     });

//     // 收到srsCandidate
//     socket.on(WsMsgTypeEnum.srsCandidate, (data: WsCandidateType) => {
//       prettierInfoLog({
//         msg: '收到srsCandidate',
//         socket,
//         roomId: data.data.live_room_id,
//       });
//       socketEmit<WsCandidateType['data']>({
//         socket,
//         roomId: data.data.live_room_id,
//         msgType: WsMsgTypeEnum.srsCandidate,
//         data: data.data,
//       });
//     });

//     // 收到nativeWebRtcOffer
//     socket.on(WsMsgTypeEnum.nativeWebRtcOffer, (data: WsOfferType) => {
//       prettierInfoLog({
//         msg: '收到nativeWebRtcOffer',
//         socket,
//         roomId: data.data.live_room_id,
//       });
//       socketEmit<WsOfferType['data']>({
//         roomId: data.data.live_room_id,
//         socket,
//         msgType: WsMsgTypeEnum.nativeWebRtcOffer,
//         data: data.data,
//       });
//     });

//     // 收到nativeWebRtcAnswer
//     socket.on(WsMsgTypeEnum.nativeWebRtcAnswer, (data: WsAnswerType) => {
//       prettierInfoLog({
//         msg: '收到nativeWebRtcAnswer',
//         socket,
//         roomId: data.data.live_room_id,
//       });
//       socketEmit<WsAnswerType['data']>({
//         roomId: data.data.live_room_id,
//         socket,
//         msgType: WsMsgTypeEnum.nativeWebRtcAnswer,
//         data: data.data,
//       });
//     });

//     // 收到nativeWebRtcCandidate
//     socket.on(WsMsgTypeEnum.nativeWebRtcCandidate, (data: WsCandidateType) => {
//       prettierInfoLog({
//         msg: '收到nativeWebRtcCandidate',
//         socket,
//         roomId: data.data.live_room_id,
//       });
//       socketEmit<WsCandidateType['data']>({
//         socket,
//         roomId: data.data.live_room_id,
//         msgType: WsMsgTypeEnum.nativeWebRtcCandidate,
//         data: data.data,
//       });
//     });

//     // msrBlob
//     socket.on(WsMsgTypeEnum.msrBlob, (data: WsMsrBlobType) => {
//       try {
//         prettierInfoLog({
//           msg: '收到msrBlob',
//           socket,
//           roomId: data.data.live_room_id,
//         });
//         handleWsMsrBlob({ data });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // 断开连接中
//     socket.on(WsConnectStatusEnum.disconnecting, (reason) => {
//       prettierInfoLog({
//         msg: '===== websocket断开连接中 =====',
//         socket,
//       });
//       console.log(reason);
//       handleWsDisconnecting({ io, socket });
//     });

//     // 已断开连接
//     socket.on(WsConnectStatusEnum.disconnect, (reason) => {
//       try {
//         prettierInfoLog({
//           msg: '===== websocket已断开连接 =====',
//           socket,
//         });
//         console.log(reason);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   });
// };
