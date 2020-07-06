import { Component } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';

@Component({
  selector: 'app-rsvp-subway',
  templateUrl: './rsvp-subway.component.html',
  styleUrls: ['./rsvp-subway.component.css']
})
export class RsvpSubwayComponent extends RsvpComponent {
  node_name: string;

  layout = {
    // name: 'circle',
    // rankDir: 'LR',
    // directed: true,
    // padding: 0
  };

  graphData = {
    nodes: [
      {
        data:
          {id: 'section-01', name: '01', weight: 100, colorCode: 'blue', shapeType: 'ellipse'},
        position: {x: 1, y: 1},
        style: {height: 64, width: 64, 'text-valign': 'center', 'text-halign': 'center'}
      },
      {
        data: {id: 'section-02', name: '02', weight: 100, colorCode: 'magenta', shapeType: 'ellipse'},
        position: {x: 1, y: 2},
        style: {height: 64, width: 64, 'text-valign': 'center', 'text-halign': 'center'}
      },

      {
        data: {id: 'section-03', name: '03', weight: 100, colorCode: 'magenta', shapeType: 'ellipse'},
        position: {x: 2, y: 2},
        style: {height: 64, width: 64, 'text-valign': 'center', 'text-halign': 'center'}
      },
      {
        data: {id: 'section-04', name: '04', weight: 100, colorCode: 'orange', shapeType: 'ellipse'},
        position: {x: 2, y: 1},
        style: {height: 64, width: 64, 'text-valign': 'center', 'text-halign': 'center'}
      },
    ],
    edges: [
      {
        data: {source: 'section-01', target: 'section-02', colorCode: 'blue', strength: 10},
        style: {
          'line-color': 'white',
          'line-fill': 'linear-gradient',
          'line-gradient-stop-colors': 'red red white',
          'line-gradient-stop-positions': `0% ${this.rsvpService.percentRead()}% ${this.rsvpService.percentRead()}`
        },
        },
      {data: {source: 'section-02', target: 'section-03', colorCode: 'blue', strength: 10}},
      {data: {source: 'section-03', target: 'section-04', colorCode: 'blue', strength: 10}},
    ]
  };


  ngOnInit(): void {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_SUBWAY
  }

  nodeChange(event) {
    this.node_name = event;
  }
}
