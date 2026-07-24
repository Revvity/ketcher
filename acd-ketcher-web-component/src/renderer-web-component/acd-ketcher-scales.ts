import { IKCPoint, IScales } from '../kc-types';

export class Scales implements IScales {
  public constructor(private readonly htmlElement: HTMLElement) {}

  private leftTopPoint(): IKCPoint {
    return this.htmlElement.getBoundingClientRect();
  }

  // direct transform from math coordinates to view coordinates
  transform(toPage: boolean, point: IKCPoint): IKCPoint {
    const svg = this.htmlElement.querySelector('svg');
    if (!svg) {
      return point;
    }

    const vb = svg.viewBox.baseVal;
    const p1: IKCPoint = { x: vb.x, y: vb.y };
    const p2: IKCPoint = { x: vb.width, y: vb.height };

    const paperWidth: number = svg.width.baseVal.value;
    const paperHeight: number = svg.height.baseVal.value;

    const kx = paperWidth / p2.x;
    const ky = paperHeight / p2.y;

    const bx = paperWidth - kx * (p1.x + p2.x);
    const by = paperHeight - ky * (p1.y + p2.y);

    let viewPoint: IKCPoint = { x: kx * point.x + bx, y: ky * point.y + by };

    if (toPage) {
      const leftTopPoint = this.leftTopPoint();
      viewPoint = {
        x: leftTopPoint.x + viewPoint.x,
        y: leftTopPoint.y + viewPoint.y,
      };
    }

    return viewPoint;
  }

  // inverse transform from view coordinates to math coordinates
  inverseTransform(fromPage: boolean, point: IKCPoint): IKCPoint {
    const svg = this.htmlElement.querySelector('svg');
    if (!svg) {
      return point;
    }

    const vb = svg.viewBox.baseVal;
    const p1: IKCPoint = { x: vb.x, y: vb.y };
    const p2: IKCPoint = { x: vb.width, y: vb.height };
    const leftTopPoint = this.leftTopPoint();
    const viewPoint = fromPage
      ? { x: point.x - leftTopPoint.x, y: point.y - leftTopPoint.y }
      : point;

    const paperWidth: number = svg.width.baseVal.value;
    const paperHeight: number = svg.height.baseVal.value;

    const kx = paperWidth / p2.x;
    const ky = paperHeight / p2.y;

    const bx = paperWidth - kx * (p1.x + p2.x);
    const by = paperHeight - ky * (p1.y + p2.y);

    return { x: (viewPoint.x - bx) / kx, y: (viewPoint.y - by) / ky };
  }
}
