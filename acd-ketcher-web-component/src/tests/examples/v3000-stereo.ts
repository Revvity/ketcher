import { TestCaseData } from '../renderer.model';

export const testData: TestCaseData = {
  name: 'V3000',
  model: {
    molFile:
      '\r\n  -INDIGO-03192512342D\r\n\r\n  0  0  0  0  0  0  0  0  0  0  0 V3000\r\nM  V30 BEGIN CTAB\r\nM  V30 COUNTS 6 5 0 0 0\r\nM  V30 BEGIN ATOM\r\nM  V30 1 C 3.755 -3.805 0.0 0 CFG=1\r\nM  V30 2 C 3.04789 -3.09789 0.0 0\r\nM  V30 3 C 3.04789 -4.51211 0.0 0\r\nM  V30 4 C 2.04789 -4.51211 0.0 0\r\nM  V30 5 O 2.04789 -3.09789 0.0 0\r\nM  V30 6 N 4.755 -3.805 0.0 0\r\nM  V30 END ATOM\r\nM  V30 BEGIN BOND\r\nM  V30 1 1 1 2\r\nM  V30 2 1 1 3\r\nM  V30 3 1 3 4\r\nM  V30 4 1 2 5\r\nM  V30 5 1 1 6 CFG=3\r\nM  V30 END BOND\r\nM  V30 BEGIN COLLECTION\r\nM  V30 MDLV30/STEREL1 ATOMS=(1 1)\r\nM  V30 END COLLECTION\r\nM  V30 END CTAB\r\nM  END',
    atomsInfo: [
      {
        id: '1',
        index: 0,
        label: '1',
      },
      {
        id: '1-1',
        index: 0,
        label: '1',
      },
      {
        id: '2',
        index: 1,
        label: '2',
      },
      {
        id: '2-1',
        index: 1,
        label: '2',
      },
      {
        id: '2-2',
        index: 1,
        label: '2',
      },
      {
        id: '3',
        index: 2,
        label: '3',
      },
      {
        id: '3-1',
        index: 2,
        label: '3',
      },
      {
        id: '3-2',
        index: 2,
        label: '3',
      },
      {
        id: '4',
        index: 3,
        label: '4',
      },
      {
        id: '4-1',
        index: 3,
        label: '4',
      },
      {
        id: '5',
        index: 4,
        label: '5',
      },
      {
        id: '5-1',
        index: 4,
        label: '5',
      },
      {
        id: '6',
        index: 5,
        label: '6',
      },
      {
        id: '6-1',
        index: 5,
        label: '6',
      },
      {
        id: '6-2',
        index: 5,
        label: '6',
      },
    ],
    atomsDecorations: {},
    corrArrowsInfo: [],
    highlightedAtoms: [],
    fixStructureSize: true,
    fixStructureFont: 14,
  },
  width: 1000,
  height: 1000,
  svg: '<svg height="1000" version="1.1" width="1000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative; left: -0.600006px; top: -0.75px;" viewBox="-148.56834605761938 -171.3250540593011 357.14285714285717 357.14285714285717" preserveAspectRatio="xMinYMin"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.3.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="backgroundLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="selectionPlateLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="hoveringLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="atomLayer" opacity="0.0" stroke-width="1"></rect><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M19.98209211,0L5.87499976,0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M34.17016049,14.24220322L19.98209211,0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M34.17016049,14.37553655L34.17016049,14.10886988M36.26313788,14.64220322L36.26313788,13.84220322M38.35611526,14.90886988L38.35611526,13.57553655M40.44909265,15.17553655L40.44909265,13.30886988M42.54207004,15.44220322L42.54207004,13.04220322M44.63504742,15.70886988L44.63504742,12.77553655M46.72802481,15.97553655L46.72802481,12.50886988M48.8210022,16.24220322L48.8210022,12.24220322" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M19.98209211,28.26786351L6.0687499,28.26786351" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M34.17016049,14.24220322L19.98209211,28.26786351" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="bondSkeletonLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="warningsLayer" opacity="0.0" stroke-width="1"></rect><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="54.15225259721942" y="-20" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.3999996185302734" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">OR Enantiomer</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="34.1701604898888" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,3.0505,7.4249)" stroke-width="1"><tspan dy="2.0000006975601963" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">1</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="19.982092107330626" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,3.0807,-7.4176)" stroke-width="1"><tspan dy="2.000000238418579" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">2</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="19.982092107330626" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,3.0505,7.4249)" stroke-width="1"><tspan dy="1.999998566554158" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">3</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 7px; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; fill-opacity: 1;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#000000" font="30px Arial" font-style="" fill-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.3999989003401687" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">C</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,-10.6,0)" stroke-width="1"><tspan dy="2.3999989003401687" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">H</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,-5.3,1.6)" stroke-width="1"><tspan dy="1.999998566554158" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">4</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,-16.9375,0)" stroke-width="1"><tspan dy="1.999998566554158" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">4</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 7px; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; fill-opacity: 1;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#ff0d0d" font="30px Arial" font-style="" fill-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.4000000953674316" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">O</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#ff0d0d" font="30px Arial" transform="matrix(1,0,0,1,-10.6,0)" stroke-width="1"><tspan dy="2.4000000953674316" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">H</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#ff0d0d" font="30px Arial" transform="matrix(1,0,0,1,-5.3,1.6)" stroke-width="1"><tspan dy="2.000000238418579" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">2</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#ff0d0d" font="30px Arial" transform="matrix(1,0,0,1,-16.9375,0)" stroke-width="1"><tspan dy="2.000000238418579" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">5</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 7px; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; fill-opacity: 1;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#304ff7" font="30px Arial" font-style="" fill-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.400000554509049" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">N</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#304ff7" font="30px Arial" transform="matrix(1,0,0,1,6.1,0)" stroke-width="1"><tspan dy="2.400000554509049" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">H</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#304ff7" font="30px Arial" transform="matrix(1,0,0,1,11.4,1.6)" stroke-width="1"><tspan dy="2.0000006975601963" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">3</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#304ff7" font="30px Arial" transform="matrix(1,0,0,1,17.4,0)" stroke-width="1"><tspan dy="2.0000006975601963" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">6</tspan></text><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="dataLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="additionalInfoLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="indicesLayer" opacity="0.0" stroke-width="1"></rect></svg>',
};

export const testData2: TestCaseData = {
  name: 'V3000_2',
  model: {
    molFile:
      '\r\n  -INDIGO-03202513252D\r\n\r\n  0  0  0  0  0  0  0  0  0  0  0 V3000\r\nM  V30 BEGIN CTAB\r\nM  V30 COUNTS 7 7 0 0 0\r\nM  V30 BEGIN ATOM\r\nM  V30 1 C 11.1156 -5.43767 0.0 0 CFG=1\r\nM  V30 2 C 10.4273 -4.74676 0.0 0\r\nM  V30 3 C 10.4273 -6.11805 0.0 0\r\nM  V30 4 C 9.45801 -6.11805 0.0 0\r\nM  V30 5 O 9.45801 -4.74676 0.0 0\r\nM  V30 6 N 12.085 -5.43767 0.0 0\r\nM  V30 7 C 10.1804 -7.05324 0.0 0\r\nM  V30 END ATOM\r\nM  V30 BEGIN BOND\r\nM  V30 1 1 1 2\r\nM  V30 2 1 1 3\r\nM  V30 3 1 1 6 CFG=3\r\nM  V30 4 1 2 5\r\nM  V30 5 1 3 4\r\nM  V30 6 1 3 7\r\nM  V30 7 1 4 7\r\nM  V30 END BOND\r\nM  V30 BEGIN COLLECTION\r\nM  V30 MDLV30/STEREL1 ATOMS=(1 1)\r\nM  V30 END COLLECTION\r\nM  V30 END CTAB\r\nM  END\r\n',
    atomsInfo: [
      {
        id: '1',
        index: 0,
        label: '1',
      },
      {
        id: '1-1',
        index: 0,
        label: '1',
      },
      {
        id: '2',
        index: 1,
        label: '2',
      },
      {
        id: '2-1',
        index: 1,
        label: '2',
      },
      {
        id: '2-2',
        index: 1,
        label: '2',
      },
      {
        id: '3',
        index: 2,
        label: '3',
      },
      {
        id: '3-1',
        index: 2,
        label: '3',
      },
      {
        id: '3-2',
        index: 2,
        label: '3',
      },
      {
        id: '4',
        index: 3,
        label: '4',
      },
      {
        id: '4-1',
        index: 3,
        label: '4',
      },
      {
        id: '5',
        index: 4,
        label: '5',
      },
      {
        id: '5-1',
        index: 4,
        label: '5',
      },
      {
        id: '6',
        index: 5,
        label: '6',
      },
      {
        id: '6-1',
        index: 5,
        label: '6',
      },
      {
        id: '6-2',
        index: 5,
        label: '6',
      },
    ],
    atomsDecorations: {},
    corrArrowsInfo: [],
    highlightedAtoms: [],
    fixStructureSize: true,
    fixStructureFont: 14,
  },
  width: 1000,
  height: 1000,
  svg: '<svg height="1000" version="1.1" width="1000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative; left: -0.600006px; top: -0.75px;" viewBox="-148.56834605761938 -171.3250540593011 357.14285714285717 357.14285714285717" preserveAspectRatio="xMinYMin"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.3.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="backgroundLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="selectionPlateLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="hoveringLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="atomLayer" opacity="0.0" stroke-width="1"></rect><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M19.98209211,0L5.87499976,0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M34.17016049,14.24220322L19.98209211,0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M34.17016049,14.37553655L34.17016049,14.10886988M36.26313788,14.64220322L36.26313788,13.84220322M38.35611526,14.90886988L38.35611526,13.57553655M40.44909265,15.17553655L40.44909265,13.30886988M42.54207004,15.44220322L42.54207004,13.04220322M44.63504742,15.70886988L44.63504742,12.77553655M46.72802481,15.97553655L46.72802481,12.50886988M48.8210022,16.24220322L48.8210022,12.24220322" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M19.98209211,28.26786351L6.0687499,28.26786351" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><path style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; opacity: 1;" fill="#000000" stroke="#000000" d="M34.17016049,14.24220322L19.98209211,28.26786351" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="1" transform="matrix(1,0,0,1,0,0)"></path><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="bondSkeletonLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="warningsLayer" opacity="0.0" stroke-width="1"></rect><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="54.15225259721942" y="-20" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.3999996185302734" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">OR Enantiomer</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="34.1701604898888" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,3.0505,7.4249)" stroke-width="1"><tspan dy="2.0000006975601963" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">1</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="19.982092107330626" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,3.0807,-7.4176)" stroke-width="1"><tspan dy="2.000000238418579" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">2</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="19.982092107330626" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,3.0505,7.4249)" stroke-width="1"><tspan dy="1.999998566554158" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">3</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 7px; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; fill-opacity: 1;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#000000" font="30px Arial" font-style="" fill-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.3999989003401687" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">C</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,-10.6,0)" stroke-width="1"><tspan dy="2.3999989003401687" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">H</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,-5.3,1.6)" stroke-width="1"><tspan dy="1.999998566554158" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">4</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="28.267863509104817" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#000000" font="30px Arial" transform="matrix(1,0,0,1,-16.9375,0)" stroke-width="1"><tspan dy="1.999998566554158" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">4</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 7px; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; fill-opacity: 1;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#ff0d0d" font="30px Arial" font-style="" fill-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.4000000953674316" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">O</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#ff0d0d" font="30px Arial" transform="matrix(1,0,0,1,-10.6,0)" stroke-width="1"><tspan dy="2.4000000953674316" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">H</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#ff0d0d" font="30px Arial" transform="matrix(1,0,0,1,-5.3,1.6)" stroke-width="1"><tspan dy="2.000000238418579" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">2</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="0" y="0" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#ff0d0d" font="30px Arial" transform="matrix(1,0,0,1,-16.9375,0)" stroke-width="1"><tspan dy="2.000000238418579" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">5</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 7px; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; fill-opacity: 1;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#304ff7" font="30px Arial" font-style="" fill-opacity="1" transform="matrix(1,0,0,1,0,0)" stroke-width="1"><tspan dy="2.400000554509049" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">N</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 7px Arial;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="7px" stroke="none" fill="#304ff7" font="30px Arial" transform="matrix(1,0,0,1,6.1,0)" stroke-width="1"><tspan dy="2.400000554509049" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">H</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#304ff7" font="30px Arial" transform="matrix(1,0,0,1,11.4,1.6)" stroke-width="1"><tspan dy="2.0000006975601963" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">3</tspan></text><text style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font: 5px Arial;" x="54.15225259721942" y="14.24220321793068" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="5px" stroke="none" fill="#304ff7" font="30px Arial" transform="matrix(1,0,0,1,17.4,0)" stroke-width="1"><tspan dy="2.0000006975601963" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">6</tspan></text><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="dataLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="additionalInfoLayer" opacity="0.0" stroke-width="1"></rect><rect style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" x="0" y="0" width="10" height="10" rx="0" ry="0" fill="#000000" stroke="#000" class="indicesLayer" opacity="0.0" stroke-width="1"></rect></svg>',
};
