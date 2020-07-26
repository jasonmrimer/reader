import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsComponent } from './instructions.component';
import { By } from '@angular/platform-browser';


describe('InstructionsComponent', () => {
  let component: InstructionsComponent;
  let fixture: ComponentFixture<InstructionsComponent>;
  let clickSpy;

  beforeEach(async(() => {
    clickSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      declarations: [InstructionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsComponent);
    component = fixture.componentInstance;
    component.instructions = 'given instructions'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the given message', () => {
    let instructions = fixture.debugElement.query(By.css('.instructions'));
    expect(instructions.nativeElement.textContent).toContain('given instructions');
  });

  it('should call emit on click', () => {
    spyOn(component.onPlay, 'emit');
    let button = fixture.debugElement.query(By.css('.button--play'));
    button.nativeElement.click();
    expect(component.onPlay.emit).toHaveBeenCalledWith([true]);
  });
});

