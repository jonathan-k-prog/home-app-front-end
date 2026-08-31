import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomesManagerActionsComponent } from './actions.component';
import {Home, HomeRequest} from '../../../../core/home/home.model';
import { CommonModalAddHomeComponent } from '../../../common/modal/add/home/home';
import {HomeStore} from '../../../../core/home/home.store';

describe('HomesManagerActionsComponent', () => {
  let component: HomesManagerActionsComponent;
  let fixture: ComponentFixture<HomesManagerActionsComponent>;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockHomeRequest: HomeRequest = {
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  let addHomeSpy: ReturnType<typeof vi.fn>;
  let loadHomesSpy: ReturnType<typeof vi.fn>;

  function clickButton(label: string) {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    const button = buttons.find((b) => b.textContent?.includes(label));
    button?.click();
  }

  beforeEach(async () => {
    addHomeSpy = vi.fn();
    loadHomesSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [HomesManagerActionsComponent],
      providers: [
        {
          provide: HomeStore,
          useValue: {
            addHome: addHomeSpy,
            loadHomes: loadHomesSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomesManagerActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the add modal', () => {
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddHomeComponent));
    const showModalSpy = vi.spyOn(addModal.componentInstance, 'showModal');

    clickButton('Add');

    expect(showModalSpy).toHaveBeenCalled();
  });

  it('reloads the homes on refresh', () => {
    fixture.detectChanges();

    clickButton('Refresh');

    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
  });

  it('forwards the add modal submission to the store', () => {
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddHomeComponent));
    addModal.componentInstance.onSubmit.emit(mockHomeRequest);

    expect(addHomeSpy).toHaveBeenCalledExactlyOnceWith(mockHomeRequest);
  });
});
