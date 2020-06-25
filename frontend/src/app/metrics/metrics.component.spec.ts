import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';
import { MetricsServiceStub } from './metrics-stub.service';
import { MetricsService } from './metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;
  let rows;

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

  beforeEach(async () => {
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rows = await fixture.nativeElement.querySelectorAll('tr');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table of interfaces and the times completed', async () => {
    expect(rows.length).toBe(3);
    expect(rows[0].cells[0].textContent).toBe('int1');
    expect(rows[0].cells[1].textContent).toBe('1');
    expect(rows[1].cells[0].textContent).toBe('int2');
    expect(rows[1].cells[1].textContent).toBe('2');
    expect(rows[2].cells[0].textContent).toBe('int3');
    expect(rows[2].cells[1].textContent).toBe('3');
  });

  it('should display the quiz count for each interface type', async () => {
    expect(rows.length).toBe(3);
    expect(rows[0].cells[0].textContent).toBe('int1');
    expect(rows[0].cells[2].textContent).toBe('11');
    expect(rows[1].cells[0].textContent).toBe('int2');
    expect(rows[1].cells[2].textContent).toBe('22');
    expect(rows[2].cells[0].textContent).toBe('int3');
    expect(rows[2].cells[2].textContent).toBe('33');
  });
});
