import { Component } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';
import { flipVerticallyAroundCenterOf, rotate180AroundCenterOf } from './GraphTranslator';
import { Point } from './Point';

@Component({
  selector: 'app-rsvp-subway',
  templateUrl: './rsvp-subway.component.html',
  styleUrls: ['./rsvp-subway.component.css']
})
export class RsvpSubwayComponent extends RsvpComponent {
  rawPoints = [
    new Point(32, 32),
    new Point(32, 132),
    new Point(132, 132),
    new Point(132, 32),
  ];

  translatedPoints = flipVerticallyAroundCenterOf(
    rotate180AroundCenterOf(
      this.rawPoints
    )
  );

  nodes = this.translatedPoints.map((point, index) => {
    return {
      data: {id: `section-0${index + 1}`, name: `0${index + 1}`},
      position: {x: point.x, y: point.y},
    }
  });

  graphData = {
    nodes: this.nodes,
    edges: [
      {data: {id: 'edge-1', source: 'section-01', target: 'section-02'},},
      {data: {id: 'edge-2', source: 'section-02', target: 'section-03'},},
      {data: {id: 'edge-3', source: 'section-03', target: 'section-04'},},
    ]
  };


  ngOnInit(): void {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_SUBWAY
  }
}
