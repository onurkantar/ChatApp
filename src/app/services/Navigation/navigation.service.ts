import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  nickname;
  auto;

  constructor(public navCtrl: NavController) { }

  goPage(url: string) {

    this.navCtrl.navigateForward('/' + url);
  }

  setNickname(nickname: string) {

    this.nickname = nickname;

  }

  setAuto(auto: boolean) {
    this.auto = auto;
  }

  getNickname() {
    return this.nickname;
  }

  getAuto() {
    return this.auto;
  }

  pop(url) {
    this.navCtrl.navigateBack('/' + url);
  }
}
