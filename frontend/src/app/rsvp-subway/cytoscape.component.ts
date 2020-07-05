import { Component, Input, OnChanges, Renderer2 } from '@angular/core';
import { Section } from '../rsvp-utils/Section';

declare var cytoscape: any;

@Component({
  selector: 'cytoscape-component',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
})
export class CytoscapeComponent implements OnChanges {
  @Input() public currentSection: Section;
  @Input() public elements: any;
  @Input() public currentSectionCompletion;
  @Input() public sections = [];
  style: any;
  layout: any;

  public constructor(private renderer: Renderer2) {
    this.layout = {
      name: 'preset',
    };

    this.style = [
      {
        selector: 'node',
        style: {
          height: 32,
          width: 32,
          'text-valign': 'center',
          'text-halign': 'center',
          'background-color': 'gray',
          shape: 'ellipse',
          content: 'data(name)',
          'text-outline-width': 0.15,
          'text-outline-color': 'black',
          'color': '#fff',
          'font-size': 16,
          'font-family': 'Courier'
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#ffffffff',
          'line-fill': 'linear-gradient',
          'line-gradient-stop-colors': '#63ee2a #63ee2a white',
          'line-gradient-stop-positions': `0% 0% 0%`,
          'opacity': '0.4'
        },
      }
    ]
  }

  public ngOnChanges(): any {
    this.render();
  }

  public render() {
    let cy_container = this.renderer.selectRootElement("#cy");
    let cy = this.createCytoscape(cy_container);
    this.animateEdges(cy);
  }

  private animateEdges(cy) {
    this.sections.map((section) => {
      let edge = cy.$(`#edge-${section.rank}`);
      CytoscapeComponent.play(edge.animation({
        style: this.makeGradient(section)
      }));
    });
  }

  private createCytoscape(cy_container) {
    let cy = cytoscape({
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

  private static play(elementAnimation) {
    elementAnimation
      .progress(1)
      .apply()
      .promise('frame')
      .then(() => {
      });
  }

  private isCurrentSection(section: any) {
    return this.currentSection === section;
  }

  private makeGradient(section) {
    return {
      'line-color': 'white',
      'line-fill': 'linear-gradient',
      'line-gradient-stop-colors': '#63ee2a #63ee2a white',
      'line-gradient-stop-positions': `0% ${section.percentRead}% ${section.percentRead}%`,
      'opacity': this.isCurrentSection(section) ? '0.8' : '0.4'
    };
  }
}
