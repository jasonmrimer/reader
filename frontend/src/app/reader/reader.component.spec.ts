import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { By } from '@angular/platform-browser';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;
  let titleBox;
  let contentBox;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReaderComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;

    component.title = 'fake title';
    component.content = ['one', 'two', 'three'];

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

  it('should display the first word of the content before the user presses play', function () {
    expect(contentBox.nativeElement.textContent).toBe('one');
  });

  it('should progress through the passage as the index increases', () => {
    component.index = 2;
    fixture.detectChanges();
    expect(contentBox.nativeElement.textContent).toBe('three');
  });
});
