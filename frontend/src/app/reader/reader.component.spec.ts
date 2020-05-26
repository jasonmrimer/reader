import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { By } from '@angular/platform-browser';
import { ReaderService } from './reader.service';
import { IntervalService } from './interval.service';
import { IntervalServiceMock } from './interval.service.mock.spec';

class ReaderServiceMock extends ReaderService {
  index(): number {
    return 2;
  }

  moveAhead(): void {
  }
}

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;
  let titleBox;
  let contentBox;
  let intervalServiceMock: IntervalServiceMock;

  beforeEach(async(() => {
  }));

  beforeEach(() => {
    intervalServiceMock = new IntervalServiceMock();

    TestBed.configureTestingModule({
      declarations: [ReaderComponent],
      providers: [
        {provide: IntervalService, useValue: intervalServiceMock}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;

    component.title = 'fake title';
    component.content = ['one', 'two', 'three'];
    component.readerService = new ReaderService();
    fixture.detectChanges();

    titleBox = fixture.debugElement.query(By.css('#passage-title'));
    contentBox = fixture.debugElement.query(By.css('#passage-content'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title for a passage', function () {
    expect(titleBox.nativeElement.textContent).toBe('fake title');
  });

  it('should move to the next word as the interval ticks', () => {
    expect(contentBox.nativeElement.textContent).toBe('one');
    const playButton = fixture.debugElement.query(By.css('#play-button'));
    playButton.nativeElement.click();
    fixture.detectChanges();
    expect(contentBox.nativeElement.textContent).toBe('two');
  });

  it('should pause the display', () => {
    const pauseButton = fixture.debugElement.query(By.css('#pause-button'));
    pauseButton.nativeElement.click();
    expect(intervalServiceMock.clearInterval).toHaveBeenCalled();
  });
});
