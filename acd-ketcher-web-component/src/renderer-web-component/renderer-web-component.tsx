import {
  Atom,
  Vec2,
  StereLabelStyleType,
  Render,
  Scale,
  Box2Abs,
  LayerMap,
  ReObject,
  ReAtom,
  Struct,
  MeasurementUnits,
} from 'ketcher-core';
import {
  IKCAtomDecoration,
  IKCArrow,
  IKCRenderer,
  IKCPoint,
  IScales,
  IKCAtomInfo,
  IKCNullable,
  IKCSize,
  IKCAtomHighlightableFn,
  IKCAtomClickedFn,
  IKCAtomDecorationMap,
  IKCSphere,
} from '../kc-types';
import { Scales } from './acd-ketcher-scales';
import {
  collectAtomsByMaxDist,
  getNeighborsAtomsMap,
  getSkelAtom,
} from '../utils/collect-atoms-by-max-dist';
import { StructDeserializer, findMarkushShadows } from '../utils/struct-deserializer';
import './renderer-web-component.scss';
import { PromiseRef } from '../utils/promise-ref';

class UpdateCancelledError extends Error {}

export class TransformationMatrix {
  private static readonly IDENTITY = new TransformationMatrix(1, 0, 0, 1, 0, 0);

  // eslint-disable-next-line no-useless-constructor
  public constructor(
    public readonly a: number,
    public readonly b: number,
    public readonly c: number,
    public readonly d: number,
    public readonly tx: number,
    public readonly ty: number,
  ) {}

  public static identity(): TransformationMatrix {
    return TransformationMatrix.IDENTITY;
  }

  public transform(point: IKCPoint): IKCPoint {
    const x = point.x;
    const y = point.y;

    return { x: x * this.a + y * this.c + this.tx, y: x * this.b + y * this.d + this.ty };
  }

  public inverseTransform(point: IKCPoint): IKCPoint {
    const x = point.x - this.tx;
    const y = point.y - this.ty;
    const determinant = this.determinant();

    return {
      x: (x * this.d - y * this.c) / determinant,
      y: (y * this.a - x * this.b) / determinant,
    };
  }

  private determinant(): number {
    return this.a * this.d - this.b * this.c || 1;
  }
}

const SHADOW_COLOR = '#D3D3D3';

enum Changes {
  MolFile = 1 << 0,
  AtomsInfo = 1 << 1,
  Arrows = 1 << 2,
  HighlightedAtoms = 1 << 3,
  Size = 1 << 4,
  AtomsDecorations = 1 << 5,
  Update = 1 << 6,

  All = Changes.MolFile |
    Changes.AtomsInfo |
    Changes.Arrows |
    Changes.HighlightedAtoms |
    Changes.Size |
    Changes.AtomsDecorations,
}

const fontszDef = 7;
const fontszsubDef = 5;

export class RendererWebComponent extends HTMLElement implements IKCRenderer {
  private readonly resizeObserver: ResizeObserver;
  private elMatrix = TransformationMatrix.identity();
  private elSize: IKCSize = { width: 0, height: 0 };
  private size = new Vec2(0, 0);
  private pendingChanges = 0;
  private pendingChangesHandle = 0;
  private pendingReleaseHandle = 0;
  private initialized = false;

  #updateId = 0;
  #scheduledUpdate = new PromiseRef<void>();
  #mMolFile: IKCNullable<string>;
  #molDeserializer: IKCNullable<StructDeserializer>;
  #currBrowserZoom = 1;
  private mAtomsInfo: IKCNullable<IKCAtomInfo[]>;
  private mEqualAtoms: IKCNullable<Map<number, string[]>>;
  private mAtomsDecorations: IKCNullable<Record<string, IKCAtomDecoration>>;
  private mCorrArrowsInfo: IKCNullable<IKCArrow[]>;
  private mHighlightedAtoms: IKCNullable<string[]>;
  private mIsHighlightActive: IKCNullable<boolean>;
  private mSpheres: ReadonlyArray<IKCSphere> = [];
  // atomIndex to sphere color
  private mSpheresAtomsColors: Map<
    number,
    { fillColor: string; previewColor: IKCNullable<string> }
  > | null = null;

  private shadowAtoms: Map<number, number[]> | null = null;

  private mIsAtomHighlightable: IKCAtomHighlightableFn = () => true;
  private mAtomClicked: IKCAtomClickedFn = () => {
    return false;
  };

  private renderer?: Render;
  private scales: IKCNullable<Scales>;

  private lastManuallyHighlightedAtomId: IKCNullable<string>;
  private pointedAtom: IKCNullable<string>;
  private pointedArrow: IKCNullable<string>;
  private _fixStructureSize = false;
  private _fixStructureMinSize = false;
  private _fixStructureFont = 14;
  private _fixStructureMinFont = 5;
  private _fontLabelRatio = 1;
  private _disableRescale = false;
  private _mergeAtomsFilling = false;
  private _showMarkushShadows = true;

  public readonly showMolOptions = {
    bondSpacing: 15,
    bondLength: 20,
    bondLengthUnit: MeasurementUnits.Px,
    stereoBondWidthUnit: MeasurementUnits.Px,
    bondThicknessUnit: MeasurementUnits.Px,
    microModeScale: 20,
    macroModeScale: 20,
    fontszUnit: MeasurementUnits.Px,
    fontszsubUnit: MeasurementUnits.Px,
    hashSpacing: 1.2,
    hashSpacingUnit: MeasurementUnits.Px,
    multitailArrow: {},
    innerHoverStyle: {},

    fontszInPx: fontszDef,
    fontszsubInPx: fontszsubDef,
    bondSpacingInPx: 15,
    bondThicknessInPx: 2,
    stereoBondWidthInPx: 6,
    hashSpacingInPx: 1.2,

    'dearomatize-on-load': false,
    ignoreChiralFlag: true,
    disableQueryElements: null,
    showBondIds: false,
    showHalfBondIds: false,
    showLoopIds: false,
    showValenceWarnings: true,
    maxBondLength: 0,
    atomColoring: true,
    hideImplicitHydrogen: false,
    hideTerminalLabels: false,
    carbonExplicitly: false,
    showCharge: true,
    showHydrogenLabels: 'Terminal and Hetero',
    showValence: true,
    aromaticCircle: true,
    zoom: 1,
    offset: new Vec2({
      x: 0,
      y: 0,
      z: 0,
    }),
    lineWidth: 1,
    bondSpace: 2.857142857142857,
    stereoBond: 2.857142857142857,
    subFontSize: 5,
    fontRLabel: 8.4,
    fontRLogic: 4.8999999999999995,
    radiusScaleFactor: 0.38,
    lineattr: {
      stroke: '#000',
      'stroke-width': 1,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    arrowSnappingStyle: {
      fill: '#365CFF',
      stroke: '#365CFF',
    },
    bondSnappingStyle: {
      fill: '#365CFF',
      stroke: '#365CFF',
      'stroke-width': 3,
    },
    selectionStyle: {
      fill: '#7f7',
      stroke: 'none',
    },
    highlightStyle: {
      stroke: '#0c0',
      'stroke-width': 0.6,
    },
    sgroupBracketStyle: {
      stroke: 'darkgray',
      'stroke-width': 0.5,
    },
    lassoStyle: {
      stroke: 'gray',
      'stroke-width': '1px',
    },
    selectionStyleSimpleObject: {
      stroke: '#57FF8F',
      'stroke-width': 10,
      'stroke-linecap': 'round',
    },
    movingStyle: {
      cursor: 'all-scroll',
    },
    contractedFunctionalGroupSize: 50,
    previewOpacity: 0.5,
    resetToSelect: 'paste',
    rotationStep: 15,
    showStereoFlags: false,
    colorOfAbsoluteCenters: '#ff0000',
    colorOfAndCenters: '#0000cd',
    colorOfOrCenters: '#228b22',
    colorStereogenicCenters: 'LabelsOnly',
    autoFadeOfStereoLabels: true,
    absFlagLabel: 'ABS',
    andFlagLabel: 'AND Enantiomer',
    mixedFlagLabel: 'Mixed',
    orFlagLabel: 'OR Enantiomer',
    // doubleBondWidth: 6,
    bondThickness: 2,
    stereoBondWidth: 6,
    'smart-layout': true,
    'ignore-stereochemistry-errors': true,
    'mass-skip-error-on-pseudoatoms': false,
    'gross-formula-add-rsites': true,
    'gross-formula-add-isotopes': true,
    miewMode: 'LN',
    miewTheme: 'light',
    miewAtomLabel: 'bright',
    hoverStyleSimpleObject: {},

    disableScale: true,
    //    scale: 20,
    //    bondLength: 20,
    autoScale: false,
    autoScaleMargin: 20,
    showAtomIds: false,
    hideChiralFlag: true,
    stereoLabelStyle: StereLabelStyleType.On,
    atomSelectionPlateRadius: 7 * 1.2,
    font: '30px Arial',
    fontsz: 7,
    fontszsub: 5,
    hoverStyle: {
      stroke: '#0c0',
      'stroke-width': 0.6,
    },
    fontLabelRatio: 1,
  };

  public constructor() {
    super();
    this.resizeObserver = new ResizeObserver(() => {
      this.sizeChanged();
    });
  }

  get #molDeserializerRef() {
    this.#molDeserializer ??= new StructDeserializer();
    return this.#molDeserializer;
  }

  public connectedCallback(): void {
    if (this.pendingReleaseHandle) {
      clearTimeout(this.pendingReleaseHandle);
      this.pendingReleaseHandle = 0;
    }

    this.initializeKetcher();
    if (!this.initialized) {
      this.initialized = true;
      this.onInit();
      this.schedule(Changes.All);
    }
  }

  public disconnectedCallback(): void {
    // Destroy after small delay in case the element is moved to a new position
    this.pendingReleaseHandle = setTimeout(() => {
      this.pendingReleaseHandle = 0;

      if (this.pendingChangesHandle) {
        cancelAnimationFrame(this.pendingChangesHandle);
        this.pendingChangesHandle = 0;
      }

      if (this.initialized) {
        this.initialized = false;
        this.onRelease();
      }
    }, 0) as unknown as number;
    this.#molDeserializer?.dispose();
    this.#molDeserializer = null;
  }

  private resize(size: IKCSize): void {
    if (!this.renderer) {
      return;
    }

    const minSize = 2 * this.renderer.options.autoScaleMargin + 1;
    const height = Math.max(size.height, minSize);
    const width = Math.max(size.width, minSize);
    this.size = new Vec2(width, height);
    this.renderer.paper.size = this.size;
    this.renderer.sz = this.size;
    this.renderer.setViewBox({ minX: 0, minY: 0, width: this.size.x, height: this.size.y });
    this.renderer.scrollbar.destroy();
    this.renderer.paper.setSize(this.size.x, this.size.y);

    this.renderer.update(false, this.size);
  }

  private getBB(): Box2Abs {
    return this.renderer
      ? this.renderer.ctab
          .getVBoxObj()
          .transform(Scale.modelToCanvas, this.renderer.options)
          .translate(this.renderer.options.offset || new Vec2())
      : new Box2Abs();
  }

  private rescale(): void {
    if (!this.renderer) {
      return;
    }

    const bb = this.getBB();
    const sz1 = bb?.sz();
    const marg = this.renderer.options.autoScaleMargin / this.#currBrowserZoom;
    const mv = new Vec2(marg, marg);
    const csz = this.renderer.sz;
    if (csz.x < 2 * marg + 1 || csz.y < 2 * marg + 1) {
      return;
    }

    const rescaleX = sz1.x / (csz.x - 2 * marg);
    const rescaleY = sz1.y / (csz.y - 2 * marg);
    let rescale = Math.max(rescaleX, rescaleY);
    if (this.renderer.options.maxBondLength / rescale > 1.0) rescale = 1.0;
    if (this.fixStructureSize) {
      rescale = Math.max(rescale, this.renderer.options.fontszsub / this.fixStructureFont);
    }
    let minW = '';
    let minH = '';
    if (this.fixStructureMinSize) {
      const rescaleLimit = this.renderer.options.fontszsub / this.fixStructureMinFont;
      minW = `${sz1.x / rescaleLimit + 2 * marg}px`;
      minH = `${sz1.y / rescaleLimit + 2 * marg}px`;
      if (rescale > rescaleLimit) {
        rescale = rescaleLimit;
      }
    }
    this.style.minWidth = minW;
    this.style.minHeight = minH;

    const sz2 = sz1.add(mv.scaled(2 * rescale));
    this.renderer.setViewBox({
      minX: bb.pos().x - marg * rescale - (csz.x * rescale - sz2.x) / 2,
      minY: bb.pos().y - marg * rescale - (csz.y * rescale - sz2.y) / 2,
      width: csz.x * rescale,
      height: csz.y * rescale,
    });
    this.renderer.scrollbar.destroy();
  }

  public async fitToStructure(): Promise<void> {
    if (!this.renderer) {
      return;
    }

    this._disableRescale = true;
    try {
      await this.update();
      const bb = this.getBB();
      const bbSize = bb.sz();
      const marg = this.renderer.options.autoScaleMargin;
      const scale = this.fixStructureFont / this.renderer.options.fontszsub;
      const size = new Vec2(bbSize.x * scale + marg * 2, bbSize.y * scale + marg * 2);
      this.style.width = `${size.x}px`;
      this.style.height = `${size.y}px`;
      this._disableRescale = false;
      await this.update();
    } finally {
      this._disableRescale = false;
    }
  }

  public async update(force = true): Promise<void> {
    if (force) {
      this.schedule(Changes.All);
    }
    return this.#scheduledUpdate.promise;
  }

  public getAtomIndex(position: IKCPoint): number {
    let atomIndex = -1;
    this.renderer?.ctab.atoms.forEach((atom, index: number) => {
      if (this.isAtomPointed(atom.a, position.x, position.y)) {
        atomIndex = index;
      }
    });

    return atomIndex;
  }

  public highlightAtoms(atomIndexes: Set<number>, atomIdxToMakeRed: number | null): void {
    if (!this.renderer) {
      return;
    }

    const rnd: Render = this.renderer;

    rnd?.ctab.atoms.forEach((atom, index) => {
      const hs = { ...this.showMolOptions.hoverStyle };
      hs.stroke = index === atomIdxToMakeRed ? '#f00' : '#0c0';
      this.setHighlightWithStyle(atom, atomIndexes.has(index), rnd, hs);
    });
  }

  private setHighlightWithStyle(
    atom: ReAtom,
    highLight: boolean,
    render: Render,
    style: Record<string, string | number>,
  ) {
    if (atom.highlightStyle?.stroke !== style.stroke) {
      atom.highlightStyle = style;
      if (atom.hovering) {
        atom.hovering.attr(style);
      }
    }

    if (highLight) {
      const noredraw = !!atom.hovering && !atom.hovering?.removed;
      if (noredraw) {
        atom.hovering.show();
      } else {
        atom.hovering = this.drawAtomHighlight(render, atom);
      }
    } else if (atom.hovering) {
      atom.hovering.hide();
    }

    atom.hover = false;
  }

  private drawAtomHighlight(render: Render, atom: ReAtom) {
    const { paper, options } = render;
    const { atomSelectionPlateRadius } = options;
    const ps = Scale.modelToCanvas(atom.a.pp, options);

    const ret = paper.circle(ps.x, ps.y, atomSelectionPlateRadius).attr(atom.highlightStyle);
    render.ctab.addReObjectPath(LayerMap.atom, atom.visel, ret);
    return ret;
  }

  public highlightArrow(id: IKCNullable<string>): void {
    this.renderer?.ctab.corrArrows.forEach((arrow) => {
      arrow.setHover(arrow.id === id, this.renderer);
    });
  }

  public clearHighlight(): void {
    this.clearAtomsHighlight();
    this.clearArrowsHighlight();
  }

  public toggleSelectionAtom(x: number, y: number): void {
    let selectionChanged = false;
    this.renderer?.ctab.atoms.forEach((atom) => {
      if (!selectionChanged && this.isAtomPointed(atom.a, x, y)) {
        atom.selected = !atom.selected;
        selectionChanged = true;
      }
    });

    if (!selectionChanged) {
      this.renderer?.ctab.atoms.forEach((atom) => {
        atom.selected = false;
      });
    }
    this.renderer?.ctab.setSelection([]);
  }

  private async updateStructure(updateId: number, struct: Struct): Promise<void> {
    this.#ensureSameUpdate(updateId);
    struct?.initHalfBonds();
    struct?.initNeighbors();
    struct?.setImplicitHydrogen();
    struct?.rescale();
    this.renderer?.setViewBox({ minX: 0, minY: 0, width: this.size.x, height: this.size.y });
    this.renderer?.scrollbar.destroy();
    this.renderer?.setMolecule(struct);
  }

  private updateStructureInfo(): void {
    if (!this.renderer) {
      return;
    }
    this.labelAtoms(this.mAtomsInfo);
    this.colorizeAtomsWithBonds();
    this.renderer.ctab.setCorrArrows(this.mCorrArrowsInfo);
    this.renderer?.ctab.update(false);
  }

  public hitArrowTest(): string | undefined {
    return this.renderer?.hoveredArrowId;
  }

  public getScales(): IKCNullable<IScales> {
    return this.scales;
  }

  public getCenterAtomByLabel(label: string): IKCNullable<IKCPoint> {
    let res: IKCNullable<IKCPoint> = null;

    this.renderer?.ctab.atoms.forEach((atom) => {
      if (atom.a.aam === label) {
        res = atom.a.pp.scaled(this.renderer?.options.microModeScale ?? 1);
      }
    });

    return res;
  }

  public getCenterAtomByIndex(index: number): IKCNullable<IKCPoint> {
    return this.scales?.transform(
      false,
      this.renderer?.ctab.atoms
        .get(index)
        ?.a.pp.scaled(this.renderer?.options.microModeScale ?? 1) ?? {
        x: 0,
        y: 0,
      },
    );
  }

  public getCenterCorrArrowByTwoAtomLabelsAndIndex(
    label1: string,
    label2: string,
    index: number,
  ): IKCNullable<IKCPoint> {
    const arrs: IKCPoint[] = [];

    this.renderer?.ctab.corrArrows.forEach((arrow) => {
      if (arrow.getLabelBegin() === label1 && arrow.getLabelEnd() === label2) {
        arrs.push(arrow.getCenter());
      }
    });
    if (index >= 0 && index < arrs.length) {
      return arrs[index];
    }

    return null;
  }

  public getAtomId(position: IKCPoint): IKCNullable<string> {
    if (!this.mAtomsInfo) {
      return null;
    }

    const svg = this.querySelector('svg');
    if (!svg) {
      return undefined;
    }

    const atomIdx = this.getAtomIndex(getElementPoint(this.elMatrix, svg, position));

    const atomInfoId = this.mAtomsInfo.find((val) => val.index === atomIdx)?.id;
    if (!atomInfoId && this.shadowAtoms?.has(atomIdx)) {
      return `markushAtom${atomIdx}`;
    }

    return atomInfoId;
  }

  public atomPointed(atomId: IKCNullable<string>): void {
    this.pointedAtom = atomId;
    this.pointedArrow = null;
    this.updateHighlight();
  }

  public get elementMatrix(): readonly number[] {
    return [
      this.elMatrix.a,
      this.elMatrix.b,
      this.elMatrix.c,
      this.elMatrix.d,
      this.elMatrix.tx,
      this.elMatrix.ty,
    ];
  }

  public set elementMatrix(matrix: readonly number[] | undefined) {
    if (!Array.isArray(matrix)) {
      return;
    }

    if (matrix.length !== 6) {
      throw new Error('Transformation matrix should has 6 numbers');
    }

    this.elMatrix = new TransformationMatrix(
      matrix[0],
      matrix[1],
      matrix[2],
      matrix[3],
      matrix[4],
      matrix[5],
    );

    this.schedule(Changes.Update | Changes.AtomsInfo);
  }

  public get molFile(): IKCNullable<string> {
    return this.#mMolFile;
  }

  public set molFile(molFile: IKCNullable<string>) {
    if (this.#mMolFile !== molFile) {
      this.#mMolFile = molFile;
      this.#molDeserializer = null;
      this.#molDeserializerRef.setMolFile(molFile);
      this.mSpheresAtomsColors = null;
      this.schedule(Changes.MolFile);
    }
  }

  public get atomsInfo(): IKCNullable<IKCAtomInfo[]> {
    return this.mAtomsInfo;
  }

  public set atomsInfo(atomsInfo: IKCNullable<IKCAtomInfo[]>) {
    if (this.mAtomsInfo !== atomsInfo) {
      this.mAtomsInfo = atomsInfo;
      this.collectEqualAtoms();
      this.schedule(Changes.AtomsInfo);
    }
  }

  public set atomsDecorations(atomsDecorations: IKCNullable<IKCAtomDecorationMap>) {
    if (this.mAtomsDecorations !== atomsDecorations) {
      this.mAtomsDecorations = atomsDecorations;
      this.schedule(Changes.AtomsDecorations);
    }
  }

  public get atomsDecorations(): IKCNullable<IKCAtomDecorationMap> {
    return this.mAtomsDecorations;
  }

  public set spheres(list: ReadonlyArray<IKCSphere>) {
    if (list === this.mSpheres) return;

    this.mSpheres = list ?? [];
    this.mSpheresAtomsColors = null;
    this.schedule(Changes.AtomsDecorations | Changes.HighlightedAtoms);
  }

  public get spheres(): ReadonlyArray<IKCSphere> {
    return this.mSpheres;
  }

  public get corrArrowsInfo(): IKCNullable<IKCArrow[]> {
    return this.mCorrArrowsInfo;
  }

  public set corrArrowsInfo(corrArrowsInfo: IKCNullable<IKCArrow[]>) {
    if (this.mCorrArrowsInfo !== corrArrowsInfo) {
      this.mCorrArrowsInfo = corrArrowsInfo;
      this.schedule(Changes.Arrows);
    }
  }

  public get highlightedAtoms(): IKCNullable<string[]> {
    return this.mHighlightedAtoms;
  }

  public set highlightedAtoms(highlightedAtoms: IKCNullable<string[]>) {
    if (this.mHighlightedAtoms !== highlightedAtoms) {
      this.mHighlightedAtoms = highlightedAtoms;
      this.schedule(Changes.HighlightedAtoms);
    }
  }

  public get isHighlightActive(): IKCNullable<boolean> {
    return this.mIsHighlightActive;
  }

  public set isHighlightActive(isHighlightActive: IKCNullable<boolean>) {
    this.mIsHighlightActive = isHighlightActive;
  }

  public get isAtomHighlightable(): IKCAtomHighlightableFn {
    return this.mIsAtomHighlightable;
  }

  public set isAtomHighlightable(isAtomHighlightable: IKCAtomHighlightableFn) {
    this.mIsAtomHighlightable = isAtomHighlightable;
  }

  public get atomClicked(): IKCAtomClickedFn {
    return this.mAtomClicked;
  }

  public set atomClicked(atomClicked: IKCAtomClickedFn) {
    this.mAtomClicked = atomClicked;
  }

  public get fixStructureSize(): boolean {
    return this._fixStructureSize;
  }

  public set fixStructureSize(fixSize: IKCNullable<boolean>) {
    this._fixStructureSize = !!fixSize;
    this.schedule(Changes.Size);
  }

  public get fixStructureMinSize(): boolean {
    return this._fixStructureMinSize;
  }

  public set fixStructureMinSize(fixSize: IKCNullable<boolean>) {
    this._fixStructureMinSize = !!fixSize;
    this.schedule(Changes.Size);
  }

  public get mergeAtomsFilling(): boolean {
    return this._mergeAtomsFilling;
  }

  public set mergeAtomsFilling(mergeAtomsFilling: IKCNullable<boolean>) {
    this._mergeAtomsFilling = !!mergeAtomsFilling;
    this.schedule(Changes.AtomsDecorations);
  }

  public get showMarkushShadows(): boolean {
    return this._showMarkushShadows;
  }

  public set showMarkushShadows(showMarkushShadows: IKCNullable<boolean>) {
    this._showMarkushShadows = !!showMarkushShadows;
    this.schedule(Changes.AtomsDecorations);
  }

  public get fixStructureFont(): number {
    return this._fixStructureFont;
  }

  public set fixStructureFont(value: IKCNullable<number | string>) {
    const fontSize = +(value ?? 14);
    this._fixStructureFont = isNaN(fontSize) ? 14 : fontSize;
    this.schedule(Changes.Size);
  }

  public get fixStructureMinFont(): number {
    return this._fixStructureMinFont;
  }

  public set fixStructureMinFont(value: IKCNullable<number | string>) {
    const fontSize = +(value ?? 5);
    this._fixStructureMinFont = isNaN(fontSize) ? 5 : fontSize;
    this.schedule(Changes.Size);
  }

  public get fontLabelRatio(): IKCNullable<number> {
    if (!this.renderer) {
      return undefined;
    }
    return this._fontLabelRatio;
  }

  public set fontLabelRatio(value: IKCNullable<number | string>) {
    const fontLabelRatio = +(value ?? 1);
    this._fontLabelRatio = fontLabelRatio;

    if (this.renderer) {
      this.renderer.options = {
        ...this.renderer.options,
        fontszInPx: fontszDef * this._fontLabelRatio * this.#currBrowserZoom,
        fontszsubInPx: fontszsubDef * this._fontLabelRatio * this.#currBrowserZoom,
      };
    }
    this.schedule(Changes.Size);
  }

  private clearAtomsHighlight(): void {
    if (!this.renderer) {
      return;
    }
    const rnd: Render = this.renderer;
    rnd?.ctab.atoms.forEach((atom) => {
      atom.setHover(false, rnd);
    });
  }

  private clearArrowsHighlight(): void {
    this.renderer?.ctab.corrArrows.forEach((arrow) => {
      arrow.setHover(false, this.renderer);
    });
  }

  private collectEqualAtoms(): void {
    const indexToIds = new Map<number, string[]>();
    this.atomsInfo?.forEach((ai) => {
      if (!indexToIds.has(ai.index)) {
        indexToIds.set(ai.index, [ai.id]);
      } else {
        const ids = indexToIds.get(ai.index) ?? [];
        ids.push(ai.id);
        indexToIds.set(ai.index, ids);
      }
    });

    this.mEqualAtoms = indexToIds;
  }

  private colorizeAtomsWithBonds(): void {
    if (!this.mAtomsDecorations && this.mSpheres.length === 0) {
      if (!this.showMarkushShadows || !this.shadowAtoms) {
        return;
      }
    }
    this.colorizeAtoms();
    this.colorizeBonds();
  }

  private atomInShadows(atomIdx: number): boolean {
    if (this.shadowAtoms?.has(atomIdx)) {
      return true;
    }

    for (const shadow of this.shadowAtoms?.values() ?? []) {
      if (shadow.includes(atomIdx)) {
        return true;
      }
    }

    return false;
  }

  private colorizeBonds(): void {
    this.renderer?.ctab.bonds.forEach((bond) => {
      const beginAtomIdx = bond.b.begin;
      const endAtomIdx = bond.b.end;
      const beginAtom = this.renderer?.ctab.atoms.get(beginAtomIdx);
      const endAtom = this.renderer?.ctab.atoms.get(endAtomIdx);
      const fillColorBegin = beginAtom?.fillColor;
      const fillColorEnd = endAtom?.fillColor;
      const fillScale = beginAtom?.fillScale ?? 1;
      bond.fillColor = undefined;
      const mergeFill =
        this._mergeAtomsFilling && fillColorBegin && fillColorBegin === fillColorEnd;
      const showShadow =
        this._showMarkushShadows &&
        this.atomInShadows(beginAtomIdx) &&
        this.atomInShadows(endAtomIdx);
      bond.fillColor = mergeFill ? fillColorBegin : showShadow ? SHADOW_COLOR : null;
      bond.fillScale = fillScale;
      const selected = !!bond.fillColor;
      if (selected && this.isSelectionSvgObjectExists(bond) && this.renderer?.ctab) {
        const newPath = bond.makeSelectionPlate(
          this.renderer?.ctab,
          this.renderer?.paper,
          this.renderer?.options,
        );
        bond.visel.paths = bond.visel.paths.map((e) => (e === bond.selectionPlate ? newPath : e));
        bond.selectionPlate.remove();
        bond.selectionPlate = newPath;
        newPath.insertBefore(this.renderer?.ctab.getLayers()[LayerMap.selectionPlate]);
      }
      this.renderer?.ctab.showItemSelection(bond, selected);
    });
  }

  private isSelectionSvgObjectExists(item: ReObject): boolean {
    return (
      item &&
      item.selectionPlate !== null &&
      ((!item.selectionPlate?.items && !item.selectionPlate?.removed) ||
        (Array.isArray(item.selectionPlate?.items) && !item.selectionPlate[0]?.removed))
    );
  }

  private getAtomMarkushFillColor(index: number): string | null | undefined {
    return this._showMarkushShadows && this.atomInShadows(index) ? SHADOW_COLOR : null;
  }

  private colorizeAtoms(): void {
    this.renderer?.ctab.atoms.forEach((atom, index) => {
      atom.fillColor = null;
      atom.previewColor = null;
      atom.prePreviewColor = null;
      let decoration: IKCAtomDecoration | undefined;
      const atomIds = this.mEqualAtoms?.get(index);
      if (atomIds) {
        for (const id of atomIds) {
          decoration = this.mAtomsDecorations?.[id];
          if (decoration) break;
        }
      }

      const markushShadowColor = this.getAtomMarkushFillColor(index);

      const sphereColors = this.getAtomFillColorBySphere(index);
      atom.fillColor = sphereColors?.fillColor ?? decoration?.fillColor ?? markushShadowColor;
      atom.fillScale = decoration?.fillScale ?? 1;
      atom.prePreviewColor = decoration?.prePreviewColor;
      if (decoration) {
        atom.previewColor = decoration.previewColor;
      }

      const selected = !!atom.fillColor || !!atom.previewColor || !!atom.prePreviewColor;
      if (selected && this.isSelectionSvgObjectExists(atom) && this.renderer?.ctab) {
        const newPath = atom.makeSelectionPlate(this.renderer?.ctab);
        atom.visel.paths = atom.visel.paths.map((e) => (e === atom.selectionPlate ? newPath : e));
        atom.selectionPlate.remove();
        atom.selectionPlate = newPath;
        newPath.insertBefore(this.renderer?.ctab.getLayers()[LayerMap.selectionPlate]);
      }

      this.renderer?.ctab.showItemSelection(atom, selected);
    });
  }

  private getAtomFillColorBySphere(
    atomIndex: number,
  ): { fillColor: string; previewColor: IKCNullable<string> } | undefined {
    const struct = this.renderer?.ctab.molecule;
    if (!struct) return;

    if (!this.mSpheresAtomsColors) {
      this.mSpheresAtomsColors = new Map();
      const neighborsAtomsMap = getNeighborsAtomsMap(struct);
      for (const sphere of this.mSpheres) {
        const realCenterAtomIndex = sphere.startFromSkelAtom
          ? getSkelAtom(struct, neighborsAtomsMap, sphere.centerAtomIndex)
          : sphere.centerAtomIndex;
        const atoms = collectAtomsByMaxDist(
          struct,
          realCenterAtomIndex,
          false, // already calculated real center
          sphere.radius,
          neighborsAtomsMap,
        );
        for (const atomIndex of atoms) {
          this.mSpheresAtomsColors.set(atomIndex, {
            fillColor: sphere.color,
            previewColor: atomIndex === realCenterAtomIndex ? sphere.centerAtomColor ?? null : null,
          });
        }
      }
    }
    return this.mSpheresAtomsColors.get(atomIndex);
  }

  private labelAtoms(atomsInfo: IKCNullable<IKCAtomInfo[]>): void {
    const ctab = this.renderer?.ctab;
    ctab?.atoms.forEach((atom, key) => {
      const ai = atomsInfo?.find((val) => val.index === key);
      atom.a.aam = ai?.label ?? 0;
      atom.forceAttrs = ai?.customCssLabelStyle ? ai.customCssLabelStyle : undefined;
      ctab.markAtom(key, 1);
    });
  }

  private isAtomPointed(atom: Atom, offsetX: number, offsetY: number): boolean {
    if (!this.renderer || !this.scales) {
      return false;
    }

    const pointInMathCoords: IKCPoint = atom.pp.scaled(this.renderer.options.microModeScale ?? 1);

    const pointInScreenCoords: IKCPoint = this.scales.transform(false, pointInMathCoords);

    const eps = this.showMolOptions.bondLength || 75;

    return (
      Math.abs(pointInScreenCoords.x - offsetX) <= eps &&
      Math.abs(pointInScreenCoords.y - offsetY) <= eps
    );
  }

  private initializeKetcher(): void {
    if (!this.renderer) {
      this.renderer = new Render(this, this.showMolOptions);
    }

    if (!this.scales) {
      this.scales = new Scales(this);
    }
  }

  private onInit(): void {
    this.resizeObserver.observe(this, { box: 'border-box' });

    this.addEventListener('mousemove', this.onMouseMove);
    this.addEventListener('mouseleave', this.onMouseLeave);
    this.addEventListener('click', this.onMouseClick);
  }

  private onRelease(): void {
    this.resizeObserver.unobserve(this);

    this.removeEventListener('mousemove', this.onMouseMove);
    this.removeEventListener('mouseleave', this.onMouseLeave);
    this.removeEventListener('click', this.onMouseClick);
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.mAtomsInfo) {
      return;
    }

    const arrowId = this.hitArrowTest();

    if (arrowId) {
      this.pointedAtom = null;
      this.pointedArrow = arrowId;
    } else {
      let atomId = this.getAtomId(getEventPoint(event));
      if (!atomId || !this.mIsAtomHighlightable(atomId)) {
        atomId = null;
      }
      this.pointedAtom = atomId;
      this.pointedArrow = null;
    }

    this.updateHighlight();

    const shouldEmit = this.lastManuallyHighlightedAtomId !== this.pointedAtom;
    this.lastManuallyHighlightedAtomId = this.pointedAtom;

    if (shouldEmit) {
      this.dispatchEvent(
        new CustomEvent('highlightChanged', {
          detail: this.pointedAtom,
        }),
      );
    }
  }

  private onMouseClick(event: MouseEvent): void {
    const atomId = this.getAtomId(getEventPoint(event));
    if (atomId && this.mIsAtomHighlightable(atomId)) {
      if (this.mAtomClicked(atomId)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  private onMouseLeave(): void {
    this.pointedAtom = null;
    this.pointedArrow = null;
    this.schedule(Changes.HighlightedAtoms);
  }

  private updateSize(): void {
    this.elSize = { width: this.offsetWidth, height: this.offsetHeight };
    this.resize(this.elSize);
  }

  private updateHighlight(): void {
    this.#updateAtomsHighlight();
    this.highlightArrow(this.pointedArrow);
  }

  #updateAtomsHighlight(): void {
    if (!this.#mMolFile) {
      return;
    }

    const highlightedAtomIndices = new Set<number>();
    const pointedAtomIndex = this.getAtomIndexById(this.pointedAtom);
    if (this.mAtomsInfo) {
      if (this.mHighlightedAtoms) {
        for (const atomId of this.mHighlightedAtoms) {
          highlightedAtomIndices.add(this.getAtomIndexById(atomId));
        }
      }
    }

    const rnd = this.renderer;
    if (!rnd) return;

    rnd.ctab.atoms.forEach((atom, index) => {
      const sphereColors = this.getAtomFillColorBySphere(index);
      const hs = { ...this.showMolOptions.hoverStyle };
      let highlight = true;
      if (sphereColors?.previewColor) {
        hs.stroke = sphereColors.previewColor;
      } else if (
        index === pointedAtomIndex ||
        this.shadowAtoms?.get(pointedAtomIndex)?.includes(index)
      ) {
        hs.stroke = '#f00';
      } else if (highlightedAtomIndices.has(index)) {
        hs.stroke = '#0c0';
      } else {
        highlight = false;
      }
      this.setHighlightWithStyle(atom, highlight, rnd, hs);
    });
  }

  private getAtomIndexById(atomId: IKCNullable<string>): number {
    if (!atomId) {
      return -1;
    }

    const atomInfoIdx = this.mAtomsInfo?.find((atomInfo) => atomInfo.id === atomId)?.index;
    if (atomInfoIdx !== undefined) {
      return atomInfoIdx;
    }

    const shadowAtomIdx = parseInt(atomId.replace('markushAtom', ''), 10);
    if (!isNaN(shadowAtomIdx) && this.shadowAtoms?.has(shadowAtomIdx)) {
      return shadowAtomIdx;
    }

    return -1;
  }

  private schedule(changes: Changes): void {
    this.pendingChanges |= changes;
    if (this.pendingChangesHandle) {
      return;
    }

    if (!this.#scheduledUpdate.isPending()) {
      this.#scheduledUpdate = new PromiseRef();
    }
    this.#updateId++;
    this.pendingChangesHandle = requestAnimationFrame(() => {
      this.pendingChangesHandle = 0;
      this.flushChangesAsync(this.#updateId)
        .then(() => {
          this.pendingChanges = 0;
          this.pendingChangesHandle = 0;
          this.#scheduledUpdate.resolve();
        })
        .catch((err) => {
          if (!(err instanceof UpdateCancelledError)) {
            this.#scheduledUpdate.reject(err);
          }
        });
    });
  }

  #ensureSameUpdate(updateId: number): void {
    if (this.#updateId !== updateId) {
      throw new UpdateCancelledError();
    }
  }

  private getZoomLevel(): number {
    const possibleZoomValues = [
      25, 30, 33, 50, 67, 75, 80, 90, 100, 110, 120, 125, 133, 150, 170, 175, 200, 240, 250, 300,
      400, 500,
    ];
    const zoom =
      Math.min(window.outerWidth / window.innerWidth, window.outerHeight / window.innerHeight) *
      100;

    return (
      possibleZoomValues.reduce((acc, cur) => {
        return Math.abs(cur - zoom) < Math.abs(acc - zoom) ? cur : acc;
      }) / 100
    );
  }

  public sizeChanged(): void {
    let changes = this.elSize.width === 0 || this.elSize.height === 0 ? Changes.All : Changes.Size;
    const zoom = this.getZoomLevel();
    if (this.#currBrowserZoom !== zoom) {
      this.#currBrowserZoom = zoom;
      changes = Changes.All;

      if (this.renderer) {
        this.renderer.options = {
          ...this.renderer.options,
          fontszInPx: fontszDef * this._fontLabelRatio * this.#currBrowserZoom,
          fontszsubInPx: fontszsubDef * this._fontLabelRatio * this.#currBrowserZoom,
        };
      }
    }

    this.schedule(changes);
  }

  private async flushChangesAsync(updateId: number): Promise<void> {
    if (!this.pendingChanges) {
      return;
    }

    let struct: Struct | undefined;
    const molChanged = (this.pendingChanges & Changes.MolFile) !== 0;
    if (molChanged) {
      struct = await this.#molDeserializerRef.acquireStruct();
      this.shadowAtoms = struct ? findMarkushShadows(struct) : null;
    }

    this.updateSize();

    if (molChanged && struct) {
      await this.updateStructure(updateId, struct);
    }

    const infoMask = Changes.MolFile | Changes.AtomsInfo | Changes.Arrows;
    if ((this.pendingChanges & infoMask) !== 0 && this.#mMolFile) {
      this.updateStructureInfo();
    } else if ((this.pendingChanges & Changes.AtomsDecorations) !== 0) {
      this.colorizeAtomsWithBonds();
    }

    const shouldUpdateMask = infoMask | Changes.Size | Changes.AtomsDecorations | Changes.Update;
    if ((this.pendingChanges & shouldUpdateMask) !== 0) {
      this.renderer?.update(false, this.size);
    }

    const hlMask =
      Changes.MolFile |
      Changes.AtomsInfo |
      Changes.Arrows |
      Changes.HighlightedAtoms |
      Changes.AtomsDecorations;
    if ((this.pendingChanges & hlMask) !== 0) {
      this.updateHighlight();
    }

    if (!this._disableRescale) {
      this.rescale();
    }
  }
}

function getEventPoint(event: MouseEvent): IKCPoint {
  return {
    x: event.pageX || event.clientX + document.documentElement.scrollLeft,
    y: event.pageY || event.clientY + document.documentElement.scrollTop,
  };
}

function getElementPoint(
  matrix: TransformationMatrix,
  element: Element,
  pagePoint: IKCPoint,
): IKCPoint {
  const bounds = element.getBoundingClientRect();

  // FIXME: will not work if matrix has rotation
  let pt = {
    x: pagePoint.x - bounds.left + element.scrollLeft,
    y: pagePoint.y - bounds.top + element.scrollTop,
  };

  pt = matrix.inverseTransform(pt);

  return pt;
}

export function registerRenderer(): void {
  customElements.define('acd-ketcher-renderer', RendererWebComponent);
}
/*
    function getSourceBounds(el: HTMLElement): DOMRect {
      const offset = calculateOffset(el);
    
      return new DOMRect(offset.x, offset.y, el.clientWidth, el.clientHeight);
    }
    
    function calculateOffset(el: HTMLElement): IPoint {
      let x = 0;
      let y = 0;
      while (el) {
        if (el.offsetLeft) {
          x += el.offsetLeft;
        }
        if (el.offsetTop) {
          y += el.offsetTop;
        }
    
        el = el.offsetParent as HTMLElement;
      }
    
      return { x, y };
    }
    */
