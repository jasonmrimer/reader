import { Injectable } from '@angular/core';
import { Point } from './Point';
import { flipVerticallyAroundCenterOf, rotate180AroundCenterOf } from './GraphTranslator';


@Injectable({
  providedIn: 'root'
})
export class SubwayService {

  constructor() { }

  convertCoordinatesToNodes(coordinates: Point[]): any[] {
    const translatedPoints = flipVerticallyAroundCenterOf(
      rotate180AroundCenterOf(
        coordinates
      )
    );

    const nodes = translatedPoints.map((point, index) => {
      return {
        data: {id: `section-0${index + 1}`, name: `0${index + 1}`},
        position: {x: point.x, y: point.y},
      }
    });
    return nodes;
  }
}
