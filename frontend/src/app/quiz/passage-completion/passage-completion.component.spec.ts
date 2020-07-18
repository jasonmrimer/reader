import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageCompletionComponent } from './passage-completion.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PassageCompletionComponent', () => {
  let component: PassageCompletionComponent;
  let fixture: ComponentFixture<PassageCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PassageCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
