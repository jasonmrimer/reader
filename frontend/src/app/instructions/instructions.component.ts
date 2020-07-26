import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  @Input()
  instructions: string;

  @Output()
  onPlay: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  clickHandler(): void {
    this.onPlay.emit([true]);
  }
}
