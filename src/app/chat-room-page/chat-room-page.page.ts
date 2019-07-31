import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketIo } from 'ng-io';
import { NavigationService } from '../services/navigation.service';
import { ScreenService } from '../services/screen.service';
import { StorageService, Message } from '../services/storage.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.page.html',
  styleUrls: ['./chat-room-page.page.scss'],
})
export class ChatRoomPagePage implements OnInit {

  messages: Message[] = []; // done
  nickname = '';
  message = '';

  ngOnInit() {
    this.nickname = this.navCtrl.get('nickname');
    this.messages = this.storage.getMessages();
  }

  showToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private navCtrl: NavigationService,
    private socket: SocketIo,
    private screen: ScreenService,
    private storage: StorageService,
    private http: HttpService
  ) {

    this.getMessages().subscribe((message: Message) => {
      if (message.sender !== this.nickname) {
        this.messages.push(message);
      }
    });

  }


  async sendMessage() {

    const date = Date.now();

    const dummyMessage: Message = {

      key: null,
      message: this.message,
      sender: this.nickname,
      published: date

    };

    this.http.getKey().then((key) => {

      dummyMessage.key = key;

      this.socket.emit('add-message', dummyMessage);

      console.log('message sent!');
      console.log(dummyMessage);

    }).catch(error => {

      this.screen.presentToast('Local Storage is Being Used!');

    }).finally(() => {

      this.message = '';
      this.storage.store(dummyMessage);

    });


  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {

        observer.next(data);
      });
    });
    return observable;
  }

  clear() {

    this.storage.clearStorage();

  }

}
