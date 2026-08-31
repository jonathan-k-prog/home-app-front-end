import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HomesManagerPage } from './homes-manager.page';
import {Home} from '../../../core/home/home.model';
import {HomeStore} from '../../../core/home/home.store';

describe('HomesManagerPage', () => {
  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockHomes = [mockHome];

  let loadHomesSpy: ReturnType<typeof vi.fn>;
  let homesSignal: ReturnType<typeof signal<Home[]>>;
  let loadingHomesSignal: ReturnType<typeof signal<boolean>>;

  beforeEach(async () => {
    loadHomesSpy = vi.fn();
    homesSignal = signal<Home []>([]);
    loadingHomesSignal = signal(false);

    await TestBed.configureTestingModule({
      imports: [HomesManagerPage],
      providers: [
        MessageService,
        {
          provide: HomeStore,
          useValue: {
            homes: homesSignal,
            loadingHomes: loadingHomesSignal,
            loadHomes: loadHomesSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(HomesManagerPage);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads the homes on init', () => {
    const fixture = TestBed.createComponent(HomesManagerPage);

    fixture.detectChanges();

    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
  });

  it('shows a placeholder while there is no homes data', () => {
    const fixture = TestBed.createComponent(HomesManagerPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No homes found.');
  });

  it('renders homes data once the store has it', () => {
    const fixture = TestBed.createComponent(HomesManagerPage);
    fixture.detectChanges();

    homesSignal.set(mockHomes);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Home');
  });
});
