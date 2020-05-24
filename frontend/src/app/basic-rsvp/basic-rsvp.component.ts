import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { PassageService } from '../passage/passage.service';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './basic-rsvp.component.html',
  styleUrls: ['./basic-rsvp.component.css'],
  providers: [PassageService]
})
export class BasicRSVPComponent implements OnInit {
  passage: Passage = new Passage();
  reader: string[] = [''];
  index: number = 0;

  constructor(private _passageService: PassageService) {
  }

  ngOnInit() {
    this._passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.reader = this.passage.content.split(' ');
      });
  }

  playReader() {
    interval(100).subscribe(x => {
      this.moveAhead();
    })
  }

  moveAhead() {
    this.index++;
  }
}
