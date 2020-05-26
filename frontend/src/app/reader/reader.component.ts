import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ReaderService } from './reader.service';

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

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
  }

  playReader() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.readerService.moveAhead();
        })
      }, 100);
    });
  }

  currentWord() {
    return this.content[this.readerService.index()];
  }
}
