import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotActionsComponent } from './actions';

describe('ChatBotActionsComponent', () => {
  let component: ChatBotActionsComponent;
  let fixture: ComponentFixture<ChatBotActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBotActionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a button', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p-button')).not.toBeNull();
  });
});
