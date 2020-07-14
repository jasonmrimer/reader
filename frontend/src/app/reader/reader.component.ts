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

    console.log(this.rsvpService);
    console.log(this.rsvpService.readableContent);
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

  Loop(txt, wpm) {
    let
      n = txt.length,
      i = 0,
      b = document.getElementById('bw'),
      tw = document.getElementById('tw'),
      tx = {
        L: document.getElementById('txt_L'),
        C: document.getElementById('txt_C'),
        R: document.getElementById('txt_R')
      };

    function width(w) {
      tw.textContent = w;
      return tw.offsetWidth;
    }

    function middle(w) {
      var n = w.length,
        // Center char calculation. 1=1, 2-4=2, 5-7=3, ...
        c = ~~((n + 1) / 3) + 1,
        z = {a: 0, b: 0, c: 0};
      if (!n)
        return;
      z.a = width(w.substr(0, c - 1));
      z.b = width(w.substr(0, c));
      z.c = (z.b - z.a) / 2;
      b.style.paddingLeft = ~~(110 - (z.a + z.c)) + 'px';

      tx.L.textContent = w.substr(0, c - 1);
      tx.C.textContent = w.substr(c - 1, 1);
      tx.R.textContent = w.substr(c);
    }

    function word() {
      middle(txt[i])
      if (++i === n)
        i = 0;
    }
    // this.whiteout = function(w) {
    //   if (w) {
    //     tx.L.style.color = '#fff';
    //     tx.R.style.color = '#fff';
    //   } else {
    //     tx.L.style.color = '#080';
    //     tx.R.style.color = '#000';
    //   }
    // };
    wpm = wpm || 200;
    var tt = setInterval(word, (60 / wpm) * 1000);
  }

}
