import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatRoomPagePage } from './chat-room-page.page';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatRoomPagePage]
})
export class ChatRoomPagePageModule {}
