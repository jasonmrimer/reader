export const translatePointsToNewCenter = (points: any[], newCenter: any) => {
  let center = centerOf(points);
  if (points) {
    points.map((point) => {
      point.x = point.x - center.x + newCenter.x;
      point.y = point.y - center.y + newCenter.y;
      return point;
    });
  }
  return points;
};

export const centerOf: any = (points: any[]) => {
  let sumX: number = 0;
  let sumY: number = 0;
  if (points) {

    points.map((point) => {
      sumX += point.x;
      sumY += point.y;
      return point;
    });
    return {x: sumX / points.length, y: sumY / points.length};
  }
  return {x: 0, y: 0}
};

export class Point {
  constructor(
    public x: number,
    public y: number) {
  }
}
