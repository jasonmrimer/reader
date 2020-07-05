import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageComponent } from './passage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { PassageService } from '../rsvp-utils/passage.service';
import { PassageServiceStub } from '../rsvp-utils/passage-stub.service';
import { passageStub } from '../rsvp-utils/PassageStub';

describe('PassageComponent', () => {
  let component: PassageComponent;
  let fixture: ComponentFixture<PassageComponent>;
  let passageService = new PassageServiceStub();

  beforeEach(async(() => {
    spyOn(passageService, 'getPassage').and.callThrough();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PassageComponent],
      providers: [
        {provide: PassageService, useValue: passageService},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              'passageId': '1'
            }))
          }
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate with one passage based on route', async () => {
    await fixture.detectChanges();
    expect(passageService.getPassage).toHaveBeenCalledWith(1);
    expect(component.passage).toEqual(passageStub);
  });
});
