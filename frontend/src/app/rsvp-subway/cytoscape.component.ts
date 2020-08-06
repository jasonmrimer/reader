import { Component, Input, OnChanges, Renderer2 } from '@angular/core';
import { Section } from '../rsvp-utils/Section';

declare var cytoscape: any;

@Component({
  selector: 'cytoscape-component',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
})
export class CytoscapeComponent implements OnChanges {

  public constructor(private renderer: Renderer2) {
    this.layout = {
      name: 'preset',
    };

    this.style = [
      {
        selector: 'node',
        style: {
          height: 12,
          width: 12,
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
          width: 16
        },
      }
    ];
  }
  @Input() public currentSection: Section;
  @Input() public elements: any;
  @Input() public currentSectionCompletion;
  @Input() public sections: Section[] = [];
  style: any;
  layout: any;

  private static isFirst(index: number) {
    return index === 0;
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
    CytoscapeComponent.play(node.animation({
      style: {
        'background-color': 'black'
      }
    }));
  }

  private static colorNodeComplete(cy, section: Section) {
    const node = cy.$(`#section-0${section.rank}`);
    CytoscapeComponent.colorComplete(node);
  }

  private static play(elementAnimation) {
    elementAnimation
      .progress(1)
      .apply()
      .promise('frame')
      .then(() => {
      });
  }

  public ngOnChanges(): any {
    this.render();
  }

  public render() {
    const cy_container = this.renderer.selectRootElement('#cy');
    const cy = this.createCytoscape(cy_container);
    this.animateEdges(cy);
  }

  private animateEdges(cy) {
    this.sections.map((section: Section, index) => {
      const edge = cy.$(`#edge-${section.rank}`);
      CytoscapeComponent.play(edge.animation({
        style: this.makeGradient(section)
      }));
      if (CytoscapeComponent.isFirst(index)) {
        CytoscapeComponent.colorNodeComplete(cy, section);
      } else if (this.isLast(section)) {
        this.checkPreviousCompletionAndColor(index, cy, section);
        CytoscapeComponent.colorFinalIfComplete(section, cy);
      } else {
        this.checkPreviousCompletionAndColor(index, cy, section);
      }
    });
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

  private isCurrentSection(section: any) {
    return this.currentSection === section;
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
