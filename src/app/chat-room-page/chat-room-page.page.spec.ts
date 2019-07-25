import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomPagePage } from './chat-room-page.page';

describe('ChatRoomPagePage', () => {
  let component: ChatRoomPagePage;
  let fixture: ComponentFixture<ChatRoomPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
