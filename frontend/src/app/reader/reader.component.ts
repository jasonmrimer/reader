import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { IntervalService } from './interval.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit, AfterViewInit {
  public context: CanvasRenderingContext2D;

  @ViewChild('rsvpCanvas', {static: true})
  rsvpCanvas: ElementRef<HTMLCanvasElement>;

  @Input()
  rsvpService: RSVPService;

  subscription: Subscription;
  rsvpPlayer;
  wpm = 250;

  constructor(
    private ngZone: NgZone,
    private _intervalService: IntervalService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.context = this.rsvpCanvas.nativeElement.getContext('2d');
    this.context.font = "16px Arial"
    this.context.beginPath();
    this.context.arc(0, 50, 40, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.fillText('hello world', 20, 20);

    this._intervalService.setInterval(
      this.calculatePace(),
      () => {
        this.ngZone.run(() => {
          this.rsvpService.moveAhead();
        })
      }
    );

    this.subscription = this.rsvpService.isComplete$
      .pipe(skip(1))
      .subscribe(this.finishReading);

    this.Loop(this.rsvpService.readableContent, 250);
  }

  ngAfterViewInit() {
  }

  private calculatePace() {
    let millisecondsPerMinute = 60000;
    return millisecondsPerMinute / this.wpm;
  }

  private finishReading = () => {
    this._intervalService.clearInterval();
  }

  playReader() {
    this.ngZone.runOutsideAngular(() => {
      this.rsvpPlayer = this._intervalService.runInterval();
    });
  }

  pauseReader() {
    this._intervalService.clearInterval();
  }

  takeQuiz() {
    this.router.navigate(['/quiz', this.rsvpService.quizRoute]);
  }

  /*
      1 : center
 2 -  4 : center 2
 5 -  7 : center 3
 8 - 10 : center 4
11 - 13 : center 5
14 - 16 : center 6
17 - 19 : center 7
*/

  static separateAndAlign(word) {
    ReaderComponent.setAlignmentPadding(word);
    ReaderComponent.setContentOnTextElements(word);
  }

  Loop(passage, wpm) {
    let n = passage.length;

    let i = 0;

    function processPassage() {
      ReaderComponent.separateAndAlign(passage[i])
      if (++i === n)
        i = 0;
    }
    wpm = wpm || 200;
    var tt = setInterval(processPassage, (60 / wpm) * 1000);
  }

  private static setContentOnTextElements(word) {
    let centerIndex = ReaderComponent.calculateOptimalRecognitionPoint(word);
    let textElements = {
      left: document.getElementById('text-left'),
      center: document.getElementById('text-center'),
      right: document.getElementById('text-right')
    };
    textElements.left.textContent = word.substr(0, centerIndex - 1);
    textElements.center.textContent = word.substr(centerIndex - 1, 1);
    textElements.right.textContent = word.substr(centerIndex);
  }

  private static setAlignmentPadding(word) {
    let centerIndex = ReaderComponent.calculateOptimalRecognitionPoint(word);
    let textJoiner = document.getElementById('text-joiner');
    let textJoinerWidth = textJoiner.offsetWidth;


    let textElementWidths = {leftWithoutCenter: 0, leftWithCenter: 0, halfCenter: 0};

    textElementWidths.leftWithoutCenter = ReaderComponent.widthOf(word.substr(0, centerIndex - 1));
    textElementWidths.leftWithCenter = ReaderComponent.widthOf(word.substr(0, centerIndex));
    textElementWidths.halfCenter =
      (textElementWidths.leftWithCenter - textElementWidths.leftWithoutCenter) / 2;
    textJoiner.style.paddingLeft =
      ~~((textJoinerWidth / 2) - (textElementWidths.leftWithoutCenter + textElementWidths.halfCenter)) + 'px';
  }

  private static calculateOptimalRecognitionPoint(word) {
    let wordLength = word.length;
    let centerCalculation = ~~((wordLength + 1) / 3) + 1;
    return centerCalculation > 5 ? 5 : centerCalculation;
  }

  static widthOf(word) {
    let textMeasurer = document.getElementById('text-measurer');
    textMeasurer.textContent = word;
    return textMeasurer.offsetWidth;
  }
}
