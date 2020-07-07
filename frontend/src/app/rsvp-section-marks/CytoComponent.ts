import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { RSVPService } from '../rsvp-utils/rsvp.service';

declare var cytoscape: any;

@Component({
  selector: 'ng2-cytoscape',
  template: '<div id="cy"></div>',
  styles: [`#cy {
    height: 100%;
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
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  public constructor(private renderer: Renderer2, private el: ElementRef) {

    this.layout = this.layout || {
      name: 'grid',
      directed: true,
      padding: 0
    };

    this.zoom = this.zoom || {
      min: 0.1,
      max: 1.5
    };

    this.style = this.style || cytoscape.stylesheet()

      .selector('node')
      .css({
        'shape': 'data(shapeType)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 1,
        'text-outline-color': 'data(colorCode)',
        'background-color': 'data(colorCode)',
        'color': '#fff',
        'font-size': 16
      })
      .selector(':selected')
      .css({
        'border-width': 1,
        'border-color': 'black'
      })
      .selector('edge')
      .css({
      })
      // .selector('edge.questionable')
      // .css({
      //   'line-style': 'dotted',
      //   'target-arrow-shape': 'diamond'
      // })
      // .selector('.faded')
      // .css({
      //   'opacity': 0.25,
      //   'text-opacity': 0
      // });
  }

  public ngOnChanges(): any {
    this.render();
  }

  public render() {
    let cy_contianer = this.renderer.selectRootElement("#cy");
    let localselect = this.select;
    let cy = cytoscape({
      container: cy_contianer,
      layout: this.layout,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: this.elements,
    });

    // cy.on('tap', 'node', function (e) {
    //   var node = e.target;
    //   var neighborhood = node.neighborhood().add(node);
    //
    //   cy.elements().addClass('faded');
    //   neighborhood.removeClass('faded');
    //   localselect.emit(node.data('name'));
    // });
    //
    // cy.on('tap', function (e) {
    //   if (e.target === cy) {
    //     cy.elements().removeClass('faded');
    //   }
    // });



   let elementAnimation = cy.$(`#edge-${this.currentSection}`).animation({
      style: {
        'line-gradient-stop-positions': `0% ${this.currentSectionCompletion}% ${this.currentSectionCompletion}%`
        // 'line-color': 'green',
        // 'line-fill': 'linear-gradient',
        // 'line-gradient-stop-colors': 'white white green',
        // 'line-gradient-stop-positions': `0% 25% 25%`
      }
    });
   //
    elementAnimation
      .progress(1)
      .apply()
      .promise('frame')
      .then(() => {});
  }

}
