import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketIo } from 'ng-io';
import { NavigationService } from '../services/navigation.service';
import { ScreenService } from '../services/screen.service';
import { StorageService } from '../services/storage.service';
var ChatRoomPagePage = /** @class */ (function () {
    function ChatRoomPagePage(navCtrl, socket, screen, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.screen = screen;
        this.storage = storage;
        this.messages = [];
        this.nickname = '';
        this.message = '';
        this.getMessages().subscribe(function (message) {
            if (message.sender !== _this.nickname) {
                _this.messages.push(message);
            }
        });
    }
    ChatRoomPagePage.prototype.ngOnInit = function () {
        this.nickname = this.navCtrl.get('nickname');
    };
    ChatRoomPagePage.prototype.showToast = function (arg0) {
        throw new Error('Method not implemented.');
    };
    ChatRoomPagePage.prototype.sendMessage = function () {
        var date = Date.now();
        var dummyMessage = {
            key: message.key,
            message: message.message,
            sender: this.nickname,
            published: date
        };
        this.socket.emit('add-message', dummyMessage);
    };
    ChatRoomPagePage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
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
    ChatRoomPagePage = tslib_1.__decorate([
        Component({
            selector: 'app-chat-room-page',
            templateUrl: './chat-room-page.page.html',
            styleUrls: ['./chat-room-page.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavigationService,
            SocketIo,
            ScreenService,
            StorageService])
    ], ChatRoomPagePage);
    return ChatRoomPagePage;
}());
export { ChatRoomPagePage };
//# sourceMappingURL=chat-room-page.page.js.map