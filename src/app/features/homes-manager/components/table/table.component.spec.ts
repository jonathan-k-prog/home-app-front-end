import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomesManagerTableComponent } from './table.component';
import { Home } from '../../../../core/home/home.model';
import { CommonModalUpdateHomeComponent } from '../../../common/modal/update/home/home';
import { CommonModalDeleteHomeComponent } from '../../../common/modal/delete/home/home';
import {HomeStore} from '../../../../core/home/home.store';

describe('HomesManagerTableComponent', () => {
  let component: HomesManagerTableComponent;
  let fixture: ComponentFixture<HomesManagerTableComponent>;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  let updateHomeSpy: ReturnType<typeof vi.fn>;
  let deleteHomeSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    updateHomeSpy = vi.fn();
    deleteHomeSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [HomesManagerTableComponent],
      providers: [
        {
          provide: HomeStore,
          useValue: {
            updateHome: updateHomeSpy,
            deleteHome: deleteHomeSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomesManagerTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there are no homes', () => {
    fixture.componentRef.setInput('homes', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No homes found.');
  });

  it('renders a row per home', () => {
    fixture.componentRef.setInput('homes', [mockHome]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Home');
  });

  it('forwards the update modal submission to the store', () => {
    fixture.detectChanges();

    const updateModal = fixture.debugElement.query(By.directive(CommonModalUpdateHomeComponent));
    updateModal.componentInstance.onSubmit.emit(mockHome);

    expect(updateHomeSpy).toHaveBeenCalledExactlyOnceWith(mockHome);
  });

  it('forwards the delete modal submission to the store', () => {
    fixture.detectChanges();

    const deleteModal = fixture.debugElement.query(By.directive(CommonModalDeleteHomeComponent));
    deleteModal.componentInstance.onSubmit.emit(mockHome);

    expect(deleteHomeSpy).toHaveBeenCalledExactlyOnceWith(mockHome);
  });
});
