import { Component, Input, OnInit } from '@angular/core';
import { RSVPService } from '../../rsvp-utils/rsvp.service';
import { SubwayService } from '../subway.service';
import { Passage } from '../../rsvp-utils/passage';

@Component({
  selector: 'app-subway',
  templateUrl: './subway.component.html',
  styleUrls: ['./subway.component.css']
})
export class SubwayComponent implements OnInit {
  @Input() passage: Passage;
  @Input() rsvpService: RSVPService;
  nodes: any[];
  graphData: any;

  constructor(private subwayService: SubwayService) {
  }

  ngOnInit(): void {
    console.log(this.passage);
    this.nodes = this.subwayService.convertCoordinatesToNodes(this.passage.coordinates);
    this.graphData = {
      nodes: this.nodes,
      edges: [
        {data: {id: 'edge-1', source: 'section-01', target: 'section-02'},},
        {data: {id: 'edge-2', source: 'section-02', target: 'section-03'},},
        {data: {id: 'edge-3', source: 'section-03', target: 'section-04'},},
      ]
    };
  }
}
