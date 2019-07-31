import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { SocketIo } from 'ng-io';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';


  constructor(private navCtrl: NavigationService, private socket: SocketIo) {


  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', { nickname: this.nickname });
    this.navCtrl.push('chat-room-page', { nickname: this.nickname });
  }

}
