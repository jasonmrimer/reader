import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { Section } from '../rsvp-utils/Section';

declare var cytoscape: any;

@Component({
  selector: 'ng2-cytoscape',
  template: '<div id="cy"></div>',
  styles: [`#cy {
    height: 400px;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
  }`]
})
export class CytoComponent implements OnChanges {

  @Input() public elements: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Input() public percentRead;
  @Input() public currentSection;
  @Input() public currentSectionCompletion;
  @Input() public sections: Section[];
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  public constructor(private renderer: Renderer2, private el: ElementRef) {

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
          'line-color': 'white',
          'line-fill': 'linear-gradient',
          'line-gradient-stop-colors': 'green green white',
          'line-gradient-stop-positions': `0% 0% 0%`
        },
      }
    ]
  }

  public ngOnChanges(): any {
    this.render();
  }

  public render() {
    let cy_contianer = this.renderer.selectRootElement("#cy");

    let cy = cytoscape({
      container: cy_contianer,
      layout: this.layout,
      style: this.style,
      elements: this.elements,
    });

    cy.panningEnabled(false);
    cy.autoungrabify(true);
    cy.autounselectify(true);

    let sectionCompletion = this.currentSectionCompletion;
    this.sections.map((section) => {

    let elementAnimation = cy.$(`#edge-${section.rank}`).animation({
      style: {
        'line-color': 'white',
        'line-fill': 'linear-gradient',
        'line-gradient-stop-colors': 'green green white',
        'line-gradient-stop-positions': `0% ${section.percentRead}% ${section.percentRead}%`
      }
    });

    elementAnimation
      .progress(1)
      .apply()
      .promise('frame')
      .then(() => {
      });
    })
  }

}
