import { Component, OnInit } from '@angular/core';

class Row {
  constructor(
    public interfaceName: string,
    public completionCount: number
  ) {

  }
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  rows: Row[] = [
    new Row('Baseline', 0),
    new Row('RSVP Basic', 0),
    new Row('RSVP Completion Meter', 0),
    new Row('RSVP Section Marker', 0),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
