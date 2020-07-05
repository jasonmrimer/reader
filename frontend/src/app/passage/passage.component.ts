import { Component, OnInit } from '@angular/core';
import { PassageService } from '../rsvp-utils/passage.service';
import { Passage } from '../rsvp-utils/passage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css'],
  providers: [PassageService]
})
export class PassageComponent implements OnInit {
  public passage: Passage = new Passage();
  passageService: PassageService;
  passageId: number;

  constructor(
    private _passageService: PassageService,
    private route: ActivatedRoute
  ) {
    this.passageService = _passageService;
  }

  ngOnInit() {
    console.log('1');
    this.route.paramMap.subscribe(params => {
      console.log('2');
      this.passageId = parseInt(params.get('passageId'));
      console.log('f' + this.passageId);
    });


    console.log('3');
    console.log(this.passageService);
      console.log('g' + this.passageId);
    this.passageService.getPassage(this.passageId)
      .subscribe(passage => {
        console.log('4');
        this.passage = passage;
      });
  }
}
