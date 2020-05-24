import { async, ComponentFixture, inject, TestBed, tick } from '@angular/core/testing';

import { BasicRSVPComponent } from './basic-rsvp.component';
import { Passage } from '../passage/passage';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PassageService } from '../passage/passage.service';
import { Observable } from 'rxjs';

describe('BasicRSVPComponent', () => {
  let component: BasicRSVPComponent;
  let fixture: ComponentFixture<BasicRSVPComponent>;
  let testBedService;
  let componentService;

  class PassageServiceMock extends PassageService {
    getPassages(): Observable<Passage[]> {
      return Observable.of([new Passage('title', 'one two three four')]);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicRSVPComponent],
      imports: [HttpClientModule],
      providers: [PassageService]
    })
      .compileComponents();
    TestBed.overrideComponent(
      BasicRSVPComponent,
      {
        set: {
          providers: [
            {provide: PassageService, useClass: PassageServiceMock}
          ]
        }
      }
    )
    fixture = TestBed.createComponent(BasicRSVPComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.get(PassageService);
    componentService = fixture.debugElement.injector.get(PassageService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should injected a mock service', function () {
    inject([PassageService], (injectService: PassageService) => {
      expect(injectService).toBe(testBedService);
    })
  });

  it('should have a mock service in the component', function () {
    expect(componentService instanceof PassageServiceMock).toBeTruthy();
  });

  it('should display a title for a passage', function () {
    const titleBox = fixture.debugElement.query(By.css('#passage-title'));
    expect(titleBox.nativeElement.textContent).toBe('title');
  });

  it('should parse the content into a string array', function () {
    expect(component.reader.length).toBe(4);
    expect(component.reader[0]).toBe('one');
    expect(component.reader[3]).toBe('four');
  });

  it('should display the first word of the content before the user presses play', function () {
    const titleBox = fixture.debugElement.query(By.css('#passage-content'));
    expect(titleBox.nativeElement.textContent).toBe('one');
  });
});
