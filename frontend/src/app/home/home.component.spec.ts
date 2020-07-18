import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';
import { quizMetricsStub } from '../metrics/metric';
import { MetricsService } from '../metrics/metrics.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router;
  let metricsService: MetricsServiceStub;

  beforeEach(async(() => {
    quizMetricsStub[0].quizCount = 11;
    quizMetricsStub[1].quizCount = 22;
    quizMetricsStub[2].quizCount = 33;
    metricsService = new MetricsServiceStub();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HomeComponent ],
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
    expect(router.navigate).toHaveBeenCalledWith(['/int1/1']);
  });

  it('should take the reader to a random, least-used interface in case of tie', () => {
    let calls = new Set();
    spyOn(router, 'navigate').and.callFake((params) => {
      calls.add(params[0]);
    });

    quizMetricsStub[0].quizCount = 22;
    quizMetricsStub[1].quizCount = 22;
    quizMetricsStub[2].quizCount = 33;
    component.ngOnInit();
    fixture.detectChanges();

    while (!calledAllInterfaces(calls)) {
      fixture.debugElement.query(By.css('.button--start')).nativeElement.click();
      fixture.detectChanges();
    }

    expect(calledAllInterfaces(calls)).toBeTruthy();
  });

  let calledAllInterfaces = (calls) => {
    return calls.has('/int1/1') && calls.has('/int2/1');
  }
});
