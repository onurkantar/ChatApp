import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ScreenService } from '../Screen/screen.service';

export interface Message {

  key: string;
  message: string;
  sender: string;
  published: number;

}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  messages: Message[] = [];
  unsent: Message[] = [];

  constructor(
    private storage: Storage,
    private screen: ScreenService) {

    storage.keys().then(keys => {

      if (!keys.includes('messages')) {

        storage.set('messages', []);

      } else {

        storage.get('messages').then(msg => {


          for (const message of msg) {
            this.messages.push(message);
            if (message.key === null) {
              this.unsent.push(message);
            }
          }
          console.log('init messages : ');
          console.log(this.messages);

        });
      }

    });

  }

  getUnsentMessages() {
    return this.unsent;
  }

  store(message: Message) {

    this.messages.push(message);
    this.storage.set('messages', this.messages);

    console.log('message stored');
    console.log(this.messages);

  }

  getMessages() {
    return this.messages;
  }

  clearStorage() {

    this.screen.presentToast('Local Storage Cleaned!');
    while (this.messages.length !== 0) {

      this.messages.pop();

    }
    return this.storage.set('messages', this.messages);

  }

}
