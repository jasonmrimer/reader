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
  graphData: any;

  constructor(private subwayService: SubwayService) {
  }

  ngOnInit(): void {
    this.graphData = {
      nodes: this.subwayService.convertCoordinatesToNodes(this.passage.coordinates),
      edges: this.subwayService.convertCoordinateToEdges(this.passage.coordinates)
    };
  }
}
