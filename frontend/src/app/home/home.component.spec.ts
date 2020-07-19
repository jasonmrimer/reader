import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';
import { MetricsService } from '../metrics/metrics.service';
import { QuizMetric } from '../metrics/QuizMetric';
import { MetricInterfaceName } from '../metrics/MetricInterfaceName';
import { QuizMetricsStub } from '../metrics/QuizMetricStub';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router;
  let metricsService: MetricsServiceStub;
  let quizMetricsStub: QuizMetric[];

  beforeEach(async(() => {
    quizMetricsStub = QuizMetricsStub()
    metricsService = new MetricsServiceStub();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        {provide: MetricsService, useValue: metricsService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  let calledAllTiedInterfaces = (calls) => {
    return calls.has(`/${MetricInterfaceName.BASELINE}/1`) && calls.has(`/${MetricInterfaceName.RSVP_BASIC}/1`);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an introduction', () => {
    expect(fixture.debugElement.query(By.css('.container--introduction'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.introduction')).nativeElement.textContent).toContain(
      'Welcome! By clicking START you agree to be an anonymous member of my research.');
  });

  xit('should take the reader to the least-used interface on start', () => {
    spyOn(router, 'navigate').and.returnValue(true);

    fixture.debugElement.query(By.css('.button--start')).nativeElement.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([`/${MetricInterfaceName.BASELINE}/1`]);
  });

  it('should take the reader to a random, unused interface in case never used', () => {
    let calls = new Set();
    spyOn(router, 'navigate').and.callFake((params) => {
      calls.add(params[0]);
    });

    while (!calledAllTiedInterfaces(calls)) {
      fixture.detectChanges();
      fixture.debugElement.query(By.css('.button--start')).nativeElement.click();
      fixture.detectChanges();
    }

    expect(calledAllTiedInterfaces(calls)).toBeTruthy();
  });
});
