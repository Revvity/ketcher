import { LayerMap, ReStruct, Render, Scale, Vec2 } from 'src';
import ReObject from './reobject';
import ReAtom from './reatom';
import CorrArrow from 'domain/entities/corrarrow';
import util from '../util';

function shiftBondEnd(atom, pos0, dir, margin, defaultMargin) {
  let t = 0;
  const visel = atom.visel;
  for (let k = 0; k < visel.exts.length; ++k) {
    const box = visel.exts[k].translate(pos0);
    t = Math.max(t, util.shiftRayBox(pos0, dir, box));
  }
  if (t > 0) {
    pos0 = pos0.addScaled(dir, t + margin);
  } else {
    if (defaultMargin > 0) pos0 = pos0.addScaled(dir, defaultMargin);
  }
  return pos0;
}

function attrByType(color, dash, arrowType) {
  let arrowAttr = {
    stroke: color || 'green',
  } as object;

  if (arrowType === 'back' || arrowType === 'forward_back') {
    arrowAttr = { ...arrowAttr, 'arrow-start': 'block-wide-long' };
  }

  if (arrowType === 'forward' || arrowType === 'forward_back') {
    arrowAttr = { ...arrowAttr, 'arrow-end': 'block-wide-long' };
  }

  if (dash) {
    arrowAttr = { ...arrowAttr, 'stroke-dasharray': '-' };
  }

  return arrowAttr;
}

function calcTooltipPos(textSize, paper, a, b, options) {
  const centerOfArrowBox = new Vec2((a.x + b.x) / 2, (a.y + b.y) / 2);
  textSize.width = textSize.width + options.fontszsub;
  textSize.height = textSize.height + options.fontszsub;

  const tooltipPos = centerOfArrowBox;
  const vb = paper.canvas.viewBox.baseVal;
  if (tooltipPos.x > (vb.x + vb.width) / 2) {
    tooltipPos.x = Math.min(a.x, b.x) - textSize.width / 2;
  } else {
    tooltipPos.x = Math.max(a.x, b.x) + textSize.width / 2;
  }

  if (tooltipPos.y > (vb.y + vb.height) / 2) {
    tooltipPos.y = Math.min(a.y, b.y) - textSize.height / 2;
  } else {
    tooltipPos.y = Math.max(a.y, b.y) + textSize.height / 2;
  }
  return tooltipPos;
}

function makeCorrArrow(render, options, arrow: ReCorrArrow, highlighted) {
  const a = arrow.p1 ? arrow.p1 : new Vec2(0, 0);
  const b = arrow.p2 ? arrow.p2 : new Vec2(0, 0);

  const pp = `M${a.x},${a.y},L${b.x},${b.y}`;
  let p = render.paper.path(pp).attr({
    ...attrByType(arrow.item.color, arrow.item.dash, arrow.item.arrowType),
    'stroke-width': options.lineWidth * 0.4,
  });

  arrow.center = new Vec2({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  p = highlighted
    ? p.attr({
        stroke: 'red',
        'stroke-width': options.lineWidth * 0.7,
      })
    : p;

  const invisibleP = render.paper.path(pp).attr({
    'stroke-width': options.lineWidth * 4,
    opacity: 0,
    'stroke-opacity': 'transparent',
  });
  invisibleP.hover(
    function () {
      render.hoveredArrowId = arrow.id;
    },
    function () {
      render.hoveredArrowId = null;
    },
  );

  return render.paper.set(p, invisibleP);
}

function makeArc(render, options, arrow: ReCorrArrow, highlighted) {
  let c = arrow.c;
  const a = arrow.p1 ? arrow.p1 : new Vec2(0, 0);
  const b = arrow.p2 ? arrow.p2 : new Vec2(0, 0);
  const v = new Vec2(a.x - b.x, a.y - b.y);
  let l = v.length();
  let d =
    (arrow.connected
      ? v.length()
      : arrow.avgBondLength
      ? arrow.avgBondLength
      : v.length()) *
    (1 - Math.sqrt(3) / 2);

  if (arrow.connected) {
    c = c + 1;
  }

  if (c > 1) {
    d += d * (c - 1);
  }

  l = (d * d + (l * l) / 4) / (2 * d);

  const v2 = v
    .rotate(Math.PI / 2)
    .normalized()
    .scaled(options.lineWidth * 1.5);

  const v3 = v
    .rotate(Math.PI / 2)
    .normalized()
    .scaled(d);

  const centerX = (a.x + v2.x + b.x + v2.x) / 2;
  const centerY = (a.y + v2.y + b.y + v2.y) / 2;
  arrow.center = new Vec2({ x: centerX + v3.x, y: centerY + v3.y });

  const sweepFlag = '1';

  const pp =
    'M' +
    (a.x + v2.x) +
    ' ' +
    (a.y + v2.y) +
    'A ' +
    l +
    ',' +
    l +
    ' 0 0,' +
    sweepFlag +
    ' ' +
    (b.x + v2.x) +
    ',' +
    (b.y + v2.y) +
    ' m ';
  let p = render.paper.path(pp).attr({
    ...attrByType(arrow.item.color, arrow.item.dash, arrow.item.arrowType),
    'stroke-width': options.lineWidth * 0.4,
  });

  p = highlighted
    ? p.attr({
        stroke: 'red',
        'stroke-width': options.lineWidth * 0.7,
      })
    : p;

  const invisibleP = render.paper.path(pp).attr({
    'stroke-width': options.lineWidth * 4,
    opacity: 0,
    'stroke-opacity': 'transparent',
  });

  invisibleP.hover(
    function () {
      render.hoveredArrowId = arrow.id;
    },
    function () {
      render.hoveredArrowId = null;
    },
  );

  return render.paper.set(p, invisibleP);
}

function curvatureCoeff(arrows, arrow) {
  let res = 0;

  let increaseCurvatureFlag = true;
  arrows.forEach((currArrow) => {
    const arrowsCoincide =
      (currArrow.item.begin === arrow.begin &&
        currArrow.item.end === arrow.end) ||
      (currArrow.item.begin === arrow.end &&
        currArrow.item.end === arrow.begin);

    if (!increaseCurvatureFlag || arrow === currArrow.item) {
      increaseCurvatureFlag = false;
      return;
    }

    if (arrowsCoincide) {
      res++;
    }
  });

  return res;
}

export class ReCorrArrow extends ReObject {
  private readonly minLength = 1.5;
  private restruct: ReStruct | undefined;
  public id: string;
  public item: CorrArrow;
  public c: number;
  public avgBondLength: number;
  public center: Vec2;
  public p1: Vec2 | undefined;
  public p2: Vec2 | undefined;
  public connected = false;
  public tooltipTimeOut: NodeJS.Timeout | undefined;
  public popupTxt: object | undefined;
  public popup: object | undefined;

  constructor(arrow: CorrArrow) {
    super('CorrArrow');
    this.id = arrow.id;
    this.item = arrow;
    this.c = 0;
    this.avgBondLength = 0;
    this.center = new Vec2({ x: 0, y: 0 });
  }

  static isSelectable() {
    return false;
  }

  drawHover(render) {
    const ret = this.makeHoverPlate(render);
    // indices layer higher than data layer.
    // highlight layer is lower than data layer.
    // in this case highlighted arrow will be drawn above original one
    render.ctab.addReObjectPath(LayerMap.indices, this.visel, ret);
    return ret;
  }

  makeHoverPlate(render) {
    const loop = this.item.begin === this.item.end;

    if (loop) {
      return makeArc(render, render.options, this, true);
    } else if (this.connected || this.c > 0) {
      return makeArc(render, render.options, this, true);
    } else {
      return makeCorrArrow(render, render.options, this, true);
    }
  }

  onHoverShow(render) {
    this.draw_tooltip(
      render.paper,
      1,
      this.item.hintText,
      this.p1,
      this.p2,
      render.options,
    );
  }

  onHighlightHide() {
    this.hideArrowTooltip();
  }

  calcAverageBondLength(restruct) {
    let res = 0;
    let cnt = 0;
    const render = restruct.render;

    restruct.bonds.forEach((bond) => {
      const atom1 = restruct.atoms.get(bond.b.begin);
      const atom2 = restruct.atoms.get(bond.b.end);
      if (!atom1 || !atom2) {
        return;
      }

      const a = Scale.modelToCanvas(atom1.a.pp, render.options);
      const b = Scale.modelToCanvas(atom2.a.pp, render.options);

      const v = new Vec2(a.x - b.x, a.y - b.y);

      res += v.length();
      cnt++;
    });

    return cnt > 0 ? res / cnt : 0;
  }

  show(restruct: ReStruct, options) {
    this.restruct = restruct;

    const render = this.restruct.render;

    const atom1 = this.restruct.atoms.get(this.item.begin);
    const atom2 = this.restruct.atoms.get(this.item.end);

    if (!atom1 || !atom2) {
      return;
    }

    const allConnected = this.restruct.molecule.atomGetNeighbors(
      this.item.begin,
    );
    const filtered = allConnected?.filter((c) => c.aid === this.item.end);
    this.connected = filtered?.length !== 0;

    this.avgBondLength = this.calcAverageBondLength(this.restruct);
    this.c = curvatureCoeff(this.restruct.corrArrows, this.item);

    const loop = this.item.begin === this.item.end;

    this.p1 = Scale.modelToCanvas(atom1.a.pp, render.options);
    this.p2 = Scale.modelToCanvas(atom2.a.pp, render.options);

    if (!loop) {
      this.tryShiftBondEnds(loop, atom1, atom2, options);
    }

    let path;

    if (loop) {
      const dir = atom1.bisectLargestSector(restruct.molecule);
      this.p1 = shiftBondEnd(
        atom1,
        this.p1,
        dir,
        10 * options.lineWidth,
        this.avgBondLength,
      );
      path = makeArc(render, render.options, this, false);
    } else if (this.connected || this.c > 0) {
      path = makeArc(render, render.options, this, false);
    } else {
      path = makeCorrArrow(render, render.options, this, false);
    }

    this.restruct.addReObjectPath(LayerMap.data, this.visel, path, null, true);
  }

  tryShiftBondEnds(loop: boolean, atom1: ReAtom, atom2: ReAtom, options) {
    if (!this.p1 || !this.p2) {
      return;
    }
    const straight = !(loop || this.connected);
    const dir1 = new Vec2(
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y,
    ).normalized();

    const dir2 = new Vec2(
      this.p1.x - this.p2.x,
      this.p1.y - this.p2.y,
    ).normalized();

    const p1 = shiftBondEnd(
      atom1,
      this.p1,
      dir1,
      2 * options.lineWidth,
      straight ? 1.5 * options.lineWidth : undefined,
    );

    const p2 = shiftBondEnd(
      atom2,
      this.p2,
      dir2,
      2 * options.lineWidth,
      straight ? 1.5 * options.lineWidth : undefined,
    );

    const dist = Vec2.dist(p1, p2);
    if (dist > this.minLength) {
      this.p1 = p1;
      this.p2 = p2;
    }
  }

  setHover(hover: boolean, render: Render): void {
    const hoverChanged = this.hover !== hover;

    super.setHover(hover, render);

    if (hover && hoverChanged) {
      this.onHoverShow(render);
    }

    if (!hover && hoverChanged) {
      this.onHighlightHide();
    }
  }

  hideArrowTooltip() {
    clearTimeout(this.tooltipTimeOut);
    if (this.popupTxt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.popupTxt as any).remove();
      this.popupTxt = undefined;
    }
    if (this.popup) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.popup as any).remove();
      this.popup = undefined;
    }
  }

  draw_tooltip(paper, show, text, a, b, options) {
    if (show === 0) {
      clearTimeout(this.tooltipTimeOut);
      this.hideArrowTooltip();
      return;
    }
    if (text === '') return;

    this.tooltipTimeOut = setTimeout(() => {
      this.popupTxt = paper.text(10, 10, text).attr({
        fill: 'black',
        'fill-opacity': 0,
        'font-size': options.fontszsub,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const textSize = (this.popupTxt as any).getBBox();
      const tooltipPos = calcTooltipPos(textSize, paper, a, b, options);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.popupTxt as any).attr({ x: tooltipPos.x, y: tooltipPos.y }).attr({
        'fill-opacity': 1,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bBox = (this.popupTxt as any).getBBox();

      this.popup = paper
        .rect(
          bBox.x - options.fontszsub * 0.5,
          bBox.y - options.fontszsub * 0.5,
          bBox.width + options.fontszsub,
          bBox.height + options.fontszsub,
          4,
        )
        .attr({
          stroke: 'lightgray',
          'stroke-width': options.lineWidth * 0.4,
          fill: 'white',
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.popup as any).toFront();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.popupTxt as any).toFront();
    }, 500);
  }

  getLabelBegin() {
    return this.restruct?.atoms?.get(this.item.begin)?.a.aam;
  }

  getLabelEnd() {
    return this.restruct?.atoms?.get(this.item.end)?.a.aam;
  }

  getCenter() {
    return this.center;
  }
}
