import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { By } from '@angular/platform-browser';
import { ReaderService } from './reader.service';

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
  let readerServiceMock: ReaderServiceMock;

  beforeEach(async(() => {
    readerServiceMock = new ReaderServiceMock();

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
    component.readerService = readerServiceMock;
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

  it('should display the current word based on progress', () => {
    fixture.detectChanges();
    expect(contentBox.nativeElement.textContent).toBe('three');
  });
});
