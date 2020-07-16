import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageCompletionComponent } from './passage-completion.component';

describe('PassageCompletionComponent', () => {
  let component: PassageCompletionComponent;
  let fixture: ComponentFixture<PassageCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
