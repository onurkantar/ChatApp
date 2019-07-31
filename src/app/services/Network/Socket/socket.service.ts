import { Injectable } from '@angular/core';
import { SocketIo } from 'ng-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: SocketIo) { }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }
}
