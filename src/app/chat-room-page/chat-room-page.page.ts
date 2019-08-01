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

  ngOnInit() {
    this.messages = this.storage.getMessages();
    if (this.autoSync === true) {

      this.socket.emit('ping');

    }

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

    this.nickname = this.navCtrl.getNickname();
    this.autoSync = this.navCtrl.getAuto();

    this.getMessages().subscribe((message: Message) => {
      if (message.sender !== this.nickname) {
        this.messages.push(message);
      }
    });


    if (this.autoSync === true) {

      this.syncMessages().subscribe(() => {

        if (this.storage.getUnsentMessages().length !== 0) {


          this.sync.sync(false).then(flag => { });


        }

      });
    }
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

    }).catch(error => {

      this.offlineFlag = true;
      this.screen.presentToast('Local Storage is Being Used!');
      this.socket.emit('ping');

    }).finally(() => {

      this.message = '';
      this.storage.store(dummyMessage);

    });


  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  syncMessages() {
    const observable = new Observable(observer => {
      this.socket.on('pong', (pong) => {

        observer.next(pong);
      });

    });
    return observable;
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
