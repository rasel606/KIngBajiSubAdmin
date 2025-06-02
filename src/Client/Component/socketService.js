// import { io } from 'socket.io-client';

// class SocketService {
//   constructor() {
//     this.socket = null;
//   }

//   connect(token) {
//   console.log(token)
//     this.socket = io("https://api.kingbaji.live", {
//       auth: { token },
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     // Handle connection events
//     this.socket.on('connect', () => {
//       console.log('Connected to socket server');
//     });

//     this.socket.on('disconnect', () => {
//       console.log('Disconnected from socket server');
//     });

//     return this.socket;
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }

//   getSocket() {
//     return this.socket;
//   }
// }

// export default new SocketService();