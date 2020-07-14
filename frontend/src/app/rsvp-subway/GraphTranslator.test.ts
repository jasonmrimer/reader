import {
  centerOf,
  flipVerticallyAroundCenterOf,
  rotate180AroundCenterOf,
  translatePointsToNewCenter
} from './GraphTranslator';

describe('GraphTranslator', () => {
  let points: any[];
  beforeEach(() => {
    points = [
      {x: 2, y: 8},
      {x: 10, y: 5},
      {x: 2, y: 2},
      {x: -2, y: 5},
    ];
  });

  it('should calculate the center of many points', () => {
    expect(centerOf(points)).toEqual({x: 3, y: 5})
  });

  it('should translate points to leftWithoutCenter new center', () => {
    expect(translatePointsToNewCenter(points, {x: 0, y: 0})).toEqual(
      [
        {x: -1, y: 3},
        {x: 7, y: 0},
        {x: -1, y: -3},
        {x: -5, y: 0},
      ]
    );
  });

  it('should rotate points 180 degrees', () => {
    expect(rotate180AroundCenterOf(points)).toEqual(
      [
        {x: 4, y: 2},
        {x: -4, y: 5},
        {x: 4, y: 8},
        {x: 8, y: 5},
      ]
    );
  });

  it('should flip points vertically around their center', () => {
    expect(flipVerticallyAroundCenterOf(points)).toEqual(
      [
        {x: 4, y: 8},
        {x: -4, y: 5},
        {x: 4, y: 2},
        {x: 8, y: 5},
      ]
    );
  });
});
