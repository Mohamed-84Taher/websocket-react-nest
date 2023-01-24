import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  room = {};

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', { msg: 'New Message', content: body });
  }

  @SubscribeMessage('join')
  onJoin(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    this.room[client.id] = name;
    client.broadcast.emit('isJoined', { msg: `${name} is joined` });
  }
}
