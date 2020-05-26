import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ReaderService } from './reader.service';
import { IntervalService } from './interval.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  content: string[];
  @Input()
  readerService: ReaderService;
  rsvpPlayer;

  constructor(private ngZone: NgZone, private _intervalService: IntervalService) {
  }

  ngOnInit() {

  }

  playReader() {
    this.ngZone.runOutsideAngular(() => {
      this.rsvpPlayer = this._intervalService.setInterval(100,
        () => {
          this.ngZone.run(() => {
            this.readerService.moveAhead();
          })
        });
    });
  }

  pauseReader() {
    this._intervalService.clearInterval();
  }

  currentWord() {
    return this.content[this.readerService.index()];
  }
}
