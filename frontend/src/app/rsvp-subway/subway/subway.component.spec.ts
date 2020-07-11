import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubwayComponent } from './subway.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpSubwayComponent } from '../rsvp-subway.component';
import { CytoscapeComponent } from '../cytoscape.component';
import { ReaderComponent } from '../../reader/reader.component';
import { PassageService } from '../../rsvp-utils/passage.service';
import { PassageServiceStub } from '../../rsvp-utils/passage-stub.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RSVPService } from '../../rsvp-utils/rsvp.service';
import { passageStub } from '../../rsvp-utils/PassageStub';

describe('SubwayComponent', () => {
  let component: SubwayComponent;
  let fixture: ComponentFixture<SubwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        SubwayComponent,
        CytoscapeComponent,
        ReaderComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubwayComponent);
    component = fixture.componentInstance;
    component.rsvpService = new RSVPService();
    component.passage = passageStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have graph data with nodes and edges', () => {
    expect(component.graphData.nodes.length).toBe(2);
    expect(component.graphData.edges.length).toBe(1);
  });
});
