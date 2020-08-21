import {
  Component,
  DoCheck,
  Input,
  IterableDiffer,
  IterableDiffers, KeyValueDiffer, KeyValueDiffers,
  OnChanges,
  OnInit,
  Renderer2
} from '@angular/core';
import { Section } from '../rsvp-utils/Section';

declare var cytoscape: any;

@Component({
  selector: 'app-cytoscape-component',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
})
export class CytoscapeComponent implements OnInit, OnChanges {
  @Input() public currentSection: Section;
  @Input() public elements: any;
  @Input() public currentSectionCompletion;
  @Input() public sections: Section[] = [];
  style = [
    {
      selector: 'node',
      style: {
        height: 30,
        width: 30,
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': 'white',
        'border-width': 0.5,
        'border-color': 'black',
        shape: 'ellipse',
        content: 'data(name)',
      }
    },
    {
      selector: 'edge',
      style: {
        'line-color': '#ffffff',
        'line-fill': 'linear-gradient',
        'line-gradient-stop-colors': '#FFC600 #FFC600 #FBF97F',
        'line-gradient-stop-positions': `0% 0% 0%`,
        'opacity': '1',
        'line-cap': 'round',
        width: 32
      },
    }
  ];
  layout = {
    name: 'preset',
  };
  cytoscapeObject: any;
  differ: any;

  public constructor(
    private renderer: Renderer2,
    private differs: KeyValueDiffers
  ) {
  }

  private static isFirst(section: Section) {
    return section.rank === 1;
  }

  private static colorFinalIfComplete(section: Section, cy) {
    if (CytoscapeComponent.isComplete(section)) {
      CytoscapeComponent.colorFinalComplete(cy, section);
    }
  }

  private static isComplete(section: Section) {
    return section.percentRead === 100;
  }

  private static colorFinalComplete(cy, section: Section) {
    const node = cy.$(`#section-0${section.rank + 1}`);
    CytoscapeComponent.colorComplete(node);
  }

  private static colorComplete(node) {
    node.style({
        'background-color': 'black'
      }
    );
  }

  private static colorNodeComplete(cy, section: Section) {
    const node = cy.$(`#section-0${section.rank}`);
    CytoscapeComponent.colorComplete(node);
  }

  public ngOnInit() {
    this.differ = {};
    this.sections.forEach((section, index) => {
      this.differ[index] = this.differs.find(section).create();
    });
    const cy_container = this.renderer.selectRootElement('#cy');
    this.cytoscapeObject = this.createCytoscape(cy_container);
  }

  public ngOnChanges(): any {
    this.sections.forEach((section, index) => {
      if (this.differ) {
        const differ = this.differ[index];
        const changes = differ.diff(section);
        if (changes) {
          this.animateEdges(this.cytoscapeObject, section, index);
        }
      }
    });
  }

  private animateEdges(cy, section: Section, index: number) {
    const edge = cy.$(`#edge-${section.rank}`);
    edge.style(this.makeGradient(section));

    this.colorNodes(cy, section, index);
  }

  private colorNodes(cy, section: Section, index: number) {
    if (CytoscapeComponent.isFirst(section)) {
      CytoscapeComponent.colorNodeComplete(cy, section);
    } else if (this.isLast(section)) {
      this.checkPreviousCompletionAndColor(index, cy, section);
      CytoscapeComponent.colorFinalIfComplete(section, cy);
    } else {
      this.checkPreviousCompletionAndColor(index, cy, section);
    }
  }

  private isLast(section: Section) {
    return section.rank === this.sections.length - 1;
  }

  private checkPreviousCompletionAndColor(index: number, cy, section: Section) {
    if (this.previousSectionComplete(index)) {
      CytoscapeComponent.colorNodeComplete(cy, section);
    }
  }

  private previousSectionComplete(index: number) {
    return this.sections[index - 1].percentRead === 100;
  }

  private createCytoscape(cy_container) {
    const cy = cytoscape({
      container: cy_container,
      layout: this.layout,
      style: this.style,
      elements: this.elements,
    });

    cy.panningEnabled(false);
    cy.autoungrabify(true);
    cy.autounselectify(true);
    return cy;
  }

  private makeGradient(section) {
    return {
      'line-color': '#FBF97F',
      'line-fill': 'linear-gradient',
      'line-gradient-stop-colors': '#FFC600 #FFC600 #FBF97F',
      'line-gradient-stop-positions': `0% ${section.percentRead}% ${section.percentRead}%`,
    };
  }
}
