import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import {SocketIo} from 'ng-io'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';
  

  constructor(private navCtrl:NavController,private socket:SocketIo,private storage:Storage) {
    

  }

  joinChat() {
    this.storage.set('nickname',this.nickname);
    this.socket.connect();
    this.socket.emit('set-nickname', {nickname: this.nickname});
    this.navCtrl.navigateForward('/chat-room-page');
  }

}
