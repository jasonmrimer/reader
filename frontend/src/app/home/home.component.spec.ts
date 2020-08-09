import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { QuizMetric } from '../metrics/QuizMetric';
import { InterfaceName } from '../session/InterfaceName';
import { QuizMetricsPartialStub } from '../metrics/QuizMetricStub';
import { MetricsService } from '../metrics/metrics.service';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';
import { SessionServiceMock } from '../session/session-stub.service';
import { SessionService } from '../session/session.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router;
  let metricsService: MetricsService;
  let quizMetricsStub: QuizMetric[];
  let sessionService: SessionServiceMock;

  beforeEach(async(() => {
    quizMetricsStub = QuizMetricsPartialStub();
    metricsService = new MetricsServiceStub();
    sessionService = new SessionServiceMock();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        {provide: MetricsService, useValue: metricsService},
        {provide: SessionService, useValue: sessionService},
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

  const calledAllTiedInterfaces = (calls) => {
    return calls.has(`/${InterfaceName.BASELINE}/1`) && calls.has(`/${InterfaceName.RSVP_BASIC}/1`);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an introduction', () => {
    expect(fixture.debugElement.query(By.css('.container--introduction'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.introduction')).nativeElement.textContent).toContain(
      'Welcome! By clicking START you agree to be an anonymous member of my research.');
  });

  it('should take the reader to the least-used interface on start', () => {
    spyOn(router, 'navigate').and.returnValue(true);

    fixture.debugElement.query(By.css('.button--start')).nativeElement.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([`/${InterfaceName.BASELINE}/1`]);
  });

  it('should prevent user from continuing after completing all available readings', () => {
    expect(fixture.debugElement.query(By.css('.container--introduction'))).toBeTruthy();
    sessionService.isComplete = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.container--introduction'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.container--outro'))).toBeTruthy();
  });
});
