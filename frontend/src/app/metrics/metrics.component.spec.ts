import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';
import { MetricsServiceStub } from '../metrics-stub.service';
import { MetricsService } from '../metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MetricsComponent ],
      providers: [
        {provide: MetricsService, useValue: new MetricsServiceStub}
      ]
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

  it('should display a table of interfaces and the times completed', async () => {
    let rows = await fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toBe(4);
    expect(rows[0].cells[0].textContent).toBe('Baseline');
    expect(rows[1].cells[0].textContent).toBe('RSVP Basic');
    expect(rows[0].cells[1].textContent).toBe('2');
    expect(rows[1].cells[1].textContent).toBe('4');
    expect(rows[2].cells[0].textContent).toBe('RSVP Completion Meter');
    expect(rows[2].cells[1].textContent).toBe('6');
    expect(rows[3].cells[0].textContent).toBe('RSVP Section Marker');
    expect(rows[3].cells[1].textContent).toBe('8');
  });
});
