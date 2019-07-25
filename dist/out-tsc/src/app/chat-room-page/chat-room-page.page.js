import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SocketIo } from 'ng-io';
var ChatRoomPagePage = /** @class */ (function () {
    function ChatRoomPagePage(navCtrl, storage, socket, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.messages = [];
        this.nickname = '';
        this.message = '';
        this.nickname = this.storage.getItem('nickname');
        ;
        this.getMessages().subscribe(function (message) {
            _this.messages.push(message);
        });
        this.getUsers().subscribe(function (data) {
            var user = data['user'];
            if (data['event'] === 'left') {
                _this.showToast('User left: ' + user);
            }
            else {
                _this.showToast('User joined: ' + user);
            }
        });
    }
    ChatRoomPagePage.prototype.showToast = function (arg0) {
        throw new Error("Method not implemented.");
    };
    ChatRoomPagePage.prototype.sendMessage = function () {
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
    };
    ChatRoomPagePage.prototype.getUsers = function () {
        var _this = this;
        var observable = new Observable(function (observer) {
            _this.socket.on('users-changed', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPagePage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    ChatRoomPagePage.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatRoomPagePage.prototype.getMessages = function () {
        var _this = this;
        var observable = new Observable(function (observer) {
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPagePage.prototype.ngOnInit = function () {
    };
    ChatRoomPagePage = tslib_1.__decorate([
        Component({
            selector: 'app-chat-room-page',
            templateUrl: './chat-room-page.page.html',
            styleUrls: ['./chat-room-page.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, Storage, SocketIo, ToastController])
    ], ChatRoomPagePage);
    return ChatRoomPagePage;
}());
export { ChatRoomPagePage };
//# sourceMappingURL=chat-room-page.page.js.map