import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SocketIo } from 'ng-io';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.page.html',
  styleUrls: ['./chat-room-page.page.scss'],
})
export class ChatRoomPagePage implements OnInit {
  showToast(arg0: string) {
    throw new Error("Method not implemented.");
  }

  
  messages = [];
  nickname:any;
  message = '';

  constructor(private navCtrl: NavController, private storage: Storage, private socket: SocketIo, private toastCtrl: ToastController) {
    this.nickname = this.storage.get('nickname');

    this.getMessages().subscribe(message => {
      this.messages.push(message);
      //console.log(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

   }


   sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }


  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        //console.log(data);
        observer.next(data);
      });
    })
    return observable;
  }

  ngOnInit() {
  }

}
