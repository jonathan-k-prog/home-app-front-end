import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart } from './chart';

describe('Chart', () => {
  let component: Chart;
  let fixture: ComponentFixture<Chart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chart],
    }).compileComponents();

    fixture = TestBed.createComponent(Chart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds chart data from the x and y inputs', () => {
    fixture.componentRef.setInput('x', ['10:00', '10:05']);
    fixture.componentRef.setInput('y', [20, 21]);

    component.ngOnInit();

    // the component stores the input signals themselves rather than their resolved values
    expect(component.data.labels()).toEqual(['10:00', '10:05']);
    expect(component.data.datasets[0].data()).toEqual([20, 21]);
  });

  it('builds chart options with axis scales', () => {
    component.ngOnInit();

    expect(component.options.scales.x).toBeDefined();
    expect(component.options.scales.y).toBeDefined();
    expect(component.options.maintainAspectRatio).toBe(false);
  });

  it('rebuilds the chart when the x input changes', () => {
    fixture.componentRef.setInput('x', ['a']);
    fixture.componentRef.setInput('y', [1]);
    component.ngOnInit();

    fixture.componentRef.setInput('x', ['a', 'b']);
    fixture.componentRef.setInput('y', [1, 2]);
    component.ngOnChanges({
      x: { currentValue: ['a', 'b'], previousValue: ['a'], firstChange: false, isFirstChange: () => false },
    } as any);

    expect(component.data.labels()).toEqual(['a', 'b']);
  });

  it('does not rebuild the chart when unrelated changes occur', () => {
    fixture.componentRef.setInput('x', ['a']);
    fixture.componentRef.setInput('y', [1]);
    component.ngOnInit();

    const dataBefore = component.data;

    component.ngOnChanges({} as any);

    expect(component.data).toBe(dataBefore);
  });
});
