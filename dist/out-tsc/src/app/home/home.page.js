import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { SocketIo } from 'ng-io';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, socket) {
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.nickname = '';
    }
    HomePage.prototype.joinChat = function () {
        this.socket.connect();
        this.socket.emit('set-nickname', { nickname: this.nickname });
        this.navCtrl.push('chat-room-page', { nickname: this.nickname });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavigationService, SocketIo])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map