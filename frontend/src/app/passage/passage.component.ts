import { Component, OnInit } from '@angular/core';
import { PassageService } from '../rsvp-utils/passage.service';
import { Passage } from '../rsvp-utils/passage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css'],
})
export class PassageComponent implements OnInit {
  public passage: Passage = new Passage();
  passageId: number;

  constructor(
    private passageService: PassageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.passageId = parseInt(params.get('passageId'));
    });

    this.passageService
      .getPassage(this.passageId)
      .subscribe(passage => {
        this.passage = passage;
      });
  }
}
