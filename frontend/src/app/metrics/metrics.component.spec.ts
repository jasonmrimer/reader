import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';
import { By } from '@angular/platform-browser';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table of interfaces and the times completed', () => {
    // let rows = fixture.debugElement.queryAll(By.css('.metrics-row'));
    let rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toBe(4);
    expect(rows[0].cells[0].textContent).toBe('Baseline');
    expect(rows[0].cells[1].textContent).toBe('2');
    expect(rows[1].cells[0].textContent).toBe('RSVP Basic');
    expect(rows[1].cells[1].textContent).toBe('4');
    expect(rows[2].cells[0].textContent).toBe('RSVP Completion Meter');
    expect(rows[2].cells[1].textContent).toBe('6');
    expect(rows[3].cells[0].textContent).toBe('RSVP Section Marker');
    expect(rows[3].cells[1].textContent).toBe('8');
  });
});
