import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { App } from './app';
import { HomeStore } from './core/home/home.store';

@Component({ selector: 'app-nav-bar', template: '' })
class StubNavBar {}

describe('App', () => {
  let restoreSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    restoreSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: HomeStore,
          useValue: { restore: restoreSpy },
        },
      ],
    })
      .overrideComponent(App, { set: { imports: [RouterOutlet, StubNavBar] } })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('restores the current home on init', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    expect(restoreSpy).toHaveBeenCalledTimes(1);
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
