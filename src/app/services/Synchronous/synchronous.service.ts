import { Injectable } from '@angular/core';
import { StorageService, Message } from '../Storage/storage.service';
import { HttpService } from '../Network/HTTP/http.service';
import { SocketService } from '../Network/Socket/socket.service';
import { ScreenService } from '../Screen/screen.service';

@Injectable({
  providedIn: 'root'
})
export class SynchronousService {

  constructor(
    private storage: StorageService,
    private http: HttpService,
    private socket: SocketService,
    private screen: ScreenService
  ) { }

  async sync(flag: boolean): Promise<boolean> {
    const unsent: Message[] = this.storage.getUnsentMessages();

    console.log('unsent messages');
    console.log(unsent);

    return new Promise((require, resolve) => {

      for (const message of unsent) {
        this.http.getKey().then(key => {

          message.key = key;
          this.socket.sendMessage(message);
          this.storage.replaceSentMessage(message);

        }).catch(err => {
          this.screen.presentToast('CANT CONNECT TO THE SERVER!');
        });
      }

      resolve();


    }).then(() => {

      this.screen.presentToast('Sync!');
      this.storage.afterSyncSaveStorage();
      flag = this.convertFlag(flag);


      return flag;

    });





  }

  convertFlag(flag: boolean) {
    if (flag) {
      return !flag;
    } else { return flag; }
  }
  /*
    manuelSync() {
      const unsent: Message[] = this.storage.getUnsentMessages();

      console.log('unsent messages');
      console.log(unsent);

      for (const message of unsent) {
        this.http.getKey().then(key => {

          message.key = key;
          this.socket.sendMessage(message);
          this.storage.replaceSentMessage(message);

        }).catch(err => {
          this.screen.presentToast('CANT CONNECT TO THE SERVER!');
        });
      }

    this.screen.presentToast('Sync!');
    }*/
}
