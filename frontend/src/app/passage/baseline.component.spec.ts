import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineComponent } from './baseline.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { PassageService } from '../rsvp-utils/passage.service';
import { PassageServiceStub } from '../rsvp-utils/passage-stub.service';
import { passageStub } from '../rsvp-utils/PassageStub';
import { By } from '@angular/platform-browser';

describe('PassageComponent', () => {
  let component: BaselineComponent;
  let fixture: ComponentFixture<BaselineComponent>;
  let passageService: PassageService;

  beforeEach(async(() => {
    passageService = new PassageServiceStub();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BaselineComponent],
      providers: [
        {provide: PassageService, useValue: passageService},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              'passageId': '0'
            }))
          }
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate with one passage based on route', () => {
    fixture.detectChanges();
    expect(component.passage).toEqual(passageStub);
  });

  function testPreStartConditions() {
    expect(fixture.debugElement.query(By.css('.instructions'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.container--passage'))).toBeFalsy();
  }

  it('should start with instructions', () => {
    testPreStartConditions();
  });

  it('should turn instructions off and begin reading on start', () => {
    testPreStartConditions();
    fixture.debugElement.query(By.css('.button--start')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.container--passage'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.instructions'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.button--start'))).toBeFalsy();
  });
});
