import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatRoomPagePage } from './chat-room-page.page';
var routes = [
    {
        path: '',
        component: ChatRoomPagePage
    }
];
var ChatRoomPagePageModule = /** @class */ (function () {
    function ChatRoomPagePageModule() {
    }
    ChatRoomPagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ChatRoomPagePage]
        })
    ], ChatRoomPagePageModule);
    return ChatRoomPagePageModule;
}());
export { ChatRoomPagePageModule };
//# sourceMappingURL=chat-room-page.module.js.map