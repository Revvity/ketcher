export type IKCNullable<T> = T | null | undefined;

export interface IKCSize {
  readonly width: number;
  readonly height: number;
}

export interface IKCPoint {
  readonly x: number;
  readonly y: number;
}

export interface IKCCustomAtomLabelCss {
  readonly 'font-weight': string;
  readonly fill: string;
}

export interface IKCAtomDecoration {
  readonly fillColor?: IKCNullable<string>;
  readonly previewColor?: IKCNullable<string>;
  readonly prePreviewColor?: IKCNullable<string>;
  readonly fillScale?: IKCNullable<number>;
}

export type IKCAtomDecorationMap = Record<string, IKCAtomDecoration>;

export interface IKCAtomInfo {
  readonly index: number;
  readonly id: string;
  readonly label: string;
  readonly customCssLabelStyle?: IKCNullable<IKCCustomAtomLabelCss>;
}

export enum KCCorrelationArrowEndType {
  Forward = 'forward',
  Back = 'back',
  ForwardBack = 'forward_back',
}

export interface IKCArrow {
  readonly id: string;
  readonly begin: number;
  readonly end: number;
  readonly color: string;
  readonly dash: boolean;
  readonly arrowType: string;
  readonly hintText: string;
}

export interface IKCSphere {
  /** Atom index of the starting atom for the sphere calculation */
  readonly centerAtomIndex: number;
  readonly centerAtomColor?: IKCNullable<string>;
  readonly startFromSkelAtom: boolean;
  /** Sphere radius in bonds starting from the atom with index {@link IKCSphere.centerAtomIndex} */
  readonly radius: number;
  /** Color for highlighting atoms in the sphere */
  readonly color: string;
}

export interface IScales {
  // direct transform from math coordinates to view coordinates
  transform(toPage: boolean, point: IKCPoint): IKCPoint;

  // inverse transform from view coordinates to math coordinates
  inverseTransform(fromPage: boolean, point: IKCPoint): IKCPoint;
}

export interface IKCShowMolOptions {
  autoScale: boolean;
  autoScaleMargin: number;
}

export type IKCAtomHighlightableFn = (id: string) => boolean;
export type IKCAtomClickedFn = (id: string) => boolean;

export interface IKCRenderer extends HTMLElement {
  readonly showMolOptions: IKCShowMolOptions;
  elementMatrix: readonly number[] | undefined;
  molFile: IKCNullable<string>;
  atomsInfo: IKCNullable<IKCAtomInfo[]>;
  atomsDecorations: IKCNullable<IKCAtomDecorationMap>;
  corrArrowsInfo: IKCNullable<IKCArrow[]>;
  highlightedAtoms: IKCNullable<string[]>;
  isHighlightActive: IKCNullable<boolean>;
  fixStructureSize: IKCNullable<boolean>;
  /**
   * fixStructureMinSize - boolean flag that toggles limitation for structure to be resized
   * smaller so atom label will have minimal font size fixStructureMinFont
   *
   * fixStructureMinFont - minimal atom label font size while resizing
   *
   * fontLabelRatio - coefficient to atom label font size to draw. By default - 1
   */
  fixStructureMinSize: IKCNullable<boolean>;
  mergeAtomsFilling: IKCNullable<boolean>;
  showMarkushShadows: IKCNullable<boolean>;
  fixStructureFont: IKCNullable<number | string>;
  fixStructureMinFont: IKCNullable<number | string>;
  fontLabelRatio: IKCNullable<number | string>;
  spheres: ReadonlyArray<IKCSphere>;
  isAtomHighlightable: IKCAtomHighlightableFn;
  atomClicked: IKCAtomClickedFn;

  fitToStructure(): Promise<void>;
  update(force?: boolean): Promise<void>;
  /** @internal */
  sizeChanged(): void;
  /** @internal */
  getAtomIndex(position: IKCPoint): number;
  highlightAtoms(atomIndexes: Set<number>, atomIdxToMakeRed: number | null): void;
  highlightArrow(id: IKCNullable<string>): void;
  clearHighlight(): void;
  toggleSelectionAtom(x: number, y: number): void;
  hitArrowTest(): string | undefined;
  getScales(): IKCNullable<IScales>;
  getCenterAtomByLabel(label: string): IKCNullable<IKCPoint>;
  getCenterCorrArrowByTwoAtomLabelsAndIndex(
    label1: string,
    label2: string,
    index: number,
  ): IKCNullable<IKCPoint>;
  getAtomId(position: IKCPoint): IKCNullable<string>;
  atomPointed(atomId: IKCNullable<string>): void;
}

export const enum KCFormat {
  MolFile2000 = 'molFile2000',
  MolFile3000 = 'molFile3000',
  Rxn = 'rxn',
}

export interface IKCEditor extends HTMLElement {
  /** format - required format. Autodetect will be used if omitted  */
  getMolFile(format?: IKCNullable<KCFormat>): Promise<IKCNullable<string>>;
  setMolFile(molFile: string): Promise<void>;
  onKetcherReady(): Promise<void>;
}

export interface IKCStructServiceOptions {
  [key: string]: string | number | boolean | undefined;
}
export declare type KCOutputFormatType = 'png' | 'svg';
export interface IKCGenerateImageOptions extends IKCStructServiceOptions {
  outputFormat: KCOutputFormatType;
  backgroundColor?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'acd-ketcher-renderer': IKCRenderer;
    'acd-ketcher-editor': IKCEditor;
  }

  interface Window {
    KETCHER_STATIC_RESOURCES_URL?: string;
    acdKetcher: {
      generateImageAsBase64: (
        molFile: string,
        options?: IKCGenerateImageOptions,
      ) => Promise<string>;
      registerRenderer: () => Promise<void>;
      registerEditor: () => Promise<void>;
      registerPeriodicTable: () => Promise<void>;
    };
    acdKetcherInitializer: {
      registerRenderer: () => Promise<void>;
      registerEditor: () => Promise<void>;
      registerPeriodicTable: () => Promise<void>;
    };
  }
}
