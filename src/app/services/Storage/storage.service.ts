import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ScreenService } from '../Screen/screen.service';

export interface Message {

  key: string;
  message: string;
  sender: string;
  published: number;
  localKey: string;

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
    const retVal: Message[] = [];
    for (const message of this.messages) {
      if (message.key === null) {

        retVal.push(message);
      }
    }
    return retVal;
  }

  replaceSentMessage(messagePass) {

    this.messages[this.messages.indexOf(this.messages.find((message) => message.localKey === messagePass.localKey))] = messagePass;
    console.log('this messages');
    console.log(this.messages);
  }

  afterSyncSaveStorage() {
    this.storage.set('messages', this.messages);
    console.log('messages saved!');
  }

  setUnsentMessages(unsentMessages: Message[]) {
    this.unsent = unsentMessages;
  }

  store(message: Message) {

    message.localKey = generateKey();

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



function generateKey() {
  let result, i, j;
  result = '';
  for (j = 0; j < 32; j++) {
    if (j === 8 || j === 12 || j === 16 || j === 20) {
      result = result + '-';
    }
    i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}
