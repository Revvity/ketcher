import { IKCArrow, IKCAtomDecorationMap, IKCAtomInfo } from '../kc-types';

export interface RendererModel {
  readonly molFile?: string | undefined;
  readonly atomsInfo?: IKCAtomInfo[] | undefined;
  readonly atomsDecorations?: IKCAtomDecorationMap | undefined;
  readonly corrArrowsInfo?: IKCArrow[] | undefined;
  readonly highlightedAtoms?: string[] | undefined;
  readonly fixStructureSize?: boolean | undefined;
  readonly fixStructureFont?: number | undefined;
}

export interface TestCaseData {
  readonly name: string;
  readonly model: RendererModel;
  readonly width: number;
  readonly height: number;
  readonly svg: string;
}

/*
// copy-paste this code to console, focus on the acd-ketcher-renderer element in the Elements tab and execute the following code
// copy(getModel($0))
function getModel(element) {
  element.style.display = 'block';
  element.style.width = '1000px';
  element.style.height = '1000px';
  element.update();

  const result = {
    name: '',
    model: {
      molFile: element.molFile,
      atomsInfo: element.atomsInfo,
      atomsDecorations: element.atomsDecorations,
      corrArrowsInfo: element.corrArrowsInfo,
      highlightedAtoms: element.highlightedAtoms,
      fixStructureSize: element.fixStructureSize,
      fixStructureFont: element.fixStructureFont,
    },
    width: element.offsetWidth,
    height: element.offsetHeight,
    svg: element.innerHTML,
  };

  return result;
}
*/
