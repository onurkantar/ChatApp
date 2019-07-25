import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { SocketIo } from 'ng-io';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, socket, storage) {
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.storage = storage;
        this.nickname = '';
    }
    HomePage.prototype.joinChat = function () {
        this.storage.set('nickname', this.nickname);
        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);
        this.navCtrl.navigateForward('/chat-room-page');
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, SocketIo, Storage])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map