import { Component, Input, NgZone, OnInit } from '@angular/core';

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
  index: number = 0;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
  }

  playReader() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.index++;
        })
      }, 100);
    });
  }
}
