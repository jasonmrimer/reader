import { Component, OnInit } from '@angular/core';
import { PassageService } from '../rsvp-utils/passage.service';
import { Passage } from '../rsvp-utils/passage';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css'],
  providers: [PassageService]
})
export class PassageComponent implements OnInit {
  passage: Passage = new Passage();

  constructor(private _passageService: PassageService) {
  }

  ngOnInit() {
    this._passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0]
      });
  }
}
