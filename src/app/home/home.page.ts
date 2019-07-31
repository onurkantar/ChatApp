import { Component } from '@angular/core';
import { NavigationService } from '../services/Navigation/navigation.service';
import { SocketIo } from 'ng-io';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';
  auto = false;

  constructor(private navCtrl: NavigationService, private socket: SocketIo) {


  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', { nickname: this.nickname });
    this.navCtrl.setNickname(this.nickname);
    this.navCtrl.setAuto(this.auto);
    this.navCtrl.goPage('chat-room-page');
  }

}
