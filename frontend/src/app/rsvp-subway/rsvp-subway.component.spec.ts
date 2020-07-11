import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSubwayComponent } from './rsvp-subway.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PassageService } from '../rsvp-utils/passage.service';
import { PassageServiceStub } from '../rsvp-utils/passage-stub.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CytoscapeComponent } from './cytoscape.component';
import { ReaderComponent } from '../reader/reader.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RsvpSubwayComponent', () => {
  let component: RsvpSubwayComponent;
  let fixture: ComponentFixture<RsvpSubwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        RsvpSubwayComponent,
        CytoscapeComponent,
        ReaderComponent
      ],
      providers: [
        {service: PassageService, useValue: new PassageServiceStub()},
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
    fixture = TestBed.createComponent(RsvpSubwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
