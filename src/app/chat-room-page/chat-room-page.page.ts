import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/Navigation/navigation.service';
import { ScreenService } from '../services/Screen/screen.service';
import { StorageService, Message } from '../services/Storage/storage.service';
import { HttpService } from '../services/Network/HTTP/http.service';
import { SynchronousService } from '../services/Synchronous/synchronous.service';
import { SocketIo } from 'ng-io';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.page.html',
  styleUrls: ['./chat-room-page.page.scss'],
})
export class ChatRoomPagePage implements OnInit {

  messages: Message[] = []; // done
  nickname = '';
  message = '';
  autoSync = false;
  offlineFlag = false;
  source;

  ngOnInit() {
    this.messages = this.storage.getMessages();

  }

  showToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private navCtrl: NavigationService,
    private screen: ScreenService,
    private storage: StorageService,
    private http: HttpService,
    private socket: SocketIo,
    private sync: SynchronousService
  ) {

    const source = timer(10000);
    this.nickname = this.navCtrl.getNickname();
    this.autoSync = this.navCtrl.getAuto();
    console.log('auto sync : ' + this.autoSync);
    console.log('nickname : ' + this.nickname);

    this.getMessages().subscribe((message: Message) => {
      if (message.sender !== this.nickname) {
        this.messages.push(message);
      }
    });

    source.subscribe(async () => {
      console.log('offline flag : ');
      console.log(this.offlineFlag);
      if (this.offlineFlag) {

        await this.sync.sync(this.offlineFlag).then(flag => {
          this.offlineFlag = flag;

        });
        console.log(this.offlineFlag);

      }
    });

  }


  async sendMessage() {

    const date = Date.now();

    const dummyMessage: Message = {

      key: null,
      message: this.message,
      sender: this.nickname,
      published: date,
      localKey: null

    };

    this.http.getKey().then((key) => {

      dummyMessage.key = key;

      this.socket.emit('add-message', dummyMessage);

      console.log('message sent!');
      console.log(dummyMessage);

    }).catch(error => {

      this.offlineFlag = true;
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

  Synchronous() {
    this.sync.sync(false);

  }

}
