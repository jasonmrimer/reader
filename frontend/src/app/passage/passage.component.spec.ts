import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageComponent } from './passage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PassageComponent', () => {
  let component: PassageComponent;
  let fixture: ComponentFixture<PassageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PassageComponent ]
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
});
