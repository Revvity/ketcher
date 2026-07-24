import { TestCaseData } from '../renderer.model';
import svg from './catechin.svg';
import catechinWithOneSphere from './catechin-with-one-sphere.svg';
import catechinWithTwoSpheres from './catechin-with-two-spheres.svg';
import catechinWithOneSphereOnHydrogen from './catechin-with-one-sphere-on-hydrogen.svg';
import catechinWithOneSphereOnSkel from './catechin-with-one-sphere-on-skel.svg';
import catechinWithOneSphereOnHydrogenHL from './catechin-with-one-sphere-on-hydrogen-hl.svg';
import catechinWithOneSphereOnSkelHL from './catechin-with-one-sphere-on-skel-hl.svg';
import catechinWithFontLabelRatio from './catechin-font-label-ratio.svg';
import catechinWithFixedMinSize from './catechin-fixed-min-size.svg';
import catechinWithZeroSphereOnSkelHL from './catechin-with-zero-sphere-on-skel-hl.svg';
import catechinWithZeroSphereOnHydrogenHL from './catechin-with-zero-sphere-on-hydrogen-hl.svg';

export {
  catechinWithOneSphere,
  catechinWithTwoSpheres,
  catechinWithOneSphereOnHydrogen,
  catechinWithOneSphereOnSkel,
  catechinWithOneSphereOnHydrogenHL,
  catechinWithOneSphereOnSkelHL,
  catechinWithFontLabelRatio,
  catechinWithFixedMinSize,
  catechinWithZeroSphereOnSkelHL,
  catechinWithZeroSphereOnHydrogenHL,
};

export const testData: TestCaseData = {
  name: 'catechin',
  model: {
    molFile:
      '\r\n  ACD/LABS02072306282D\r\n\r\n 23 25  0  0  1  0  0  0  0  0 24 V2000\r\n  411.7466 -440.4540    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\r\n  320.7030 -433.8923    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\r\n  364.1743 -159.1212    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  273.9509 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  273.9509 -314.9615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  456.0380 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  364.1743 -369.0955    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  182.0872 -369.0955    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  546.2614 -159.1212    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  456.0380 -314.9615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  182.0872 -159.1212    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   91.8638 -314.9615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  638.1251 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  728.3485 -159.1212    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   91.8638 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  728.3485  -54.1340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  546.2614  -54.1340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  638.1251    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  182.0872 -474.0827    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  546.2614 -369.0955    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  820.2123 -209.9743    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n    0.0000 -159.1212    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  820.2123    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  7  1  1  6  0  0  0\r\n  7  2  1  1  0  0  0\r\n  3  4  1  0  0  0  0\r\n  3  6  1  0  0  0  0\r\n  4  5  2  0  0  0  0\r\n  4 11  1  0  0  0  0\r\n  5  8  1  0  0  0  0\r\n  5  7  1  0  0  0  0\r\n  6  9  1  6  0  0  0\r\n  6 10  1  0  0  0  0\r\n  7 10  1  0  0  0  0\r\n  8 19  1  0  0  0  0\r\n  8 12  2  0  0  0  0\r\n  9 13  2  0  0  0  0\r\n  9 17  1  0  0  0  0\r\n 10 20  1  1  0  0  0\r\n 11 15  2  0  0  0  0\r\n 12 15  1  0  0  0  0\r\n 13 14  1  0  0  0  0\r\n 14 21  1  0  0  0  0\r\n 14 16  2  0  0  0  0\r\n 15 22  1  0  0  0  0\r\n 16 18  1  0  0  0  0\r\n 16 23  1  0  0  0  0\r\n 17 18  2  0  0  0  0\r\nM  ZZC   1 4a\r\nM  ZZC   2 4b\r\nM  ZZC   3 1\r\nM  ZZC   4 2\r\nM  ZZC   5 3\r\nM  ZZC   6 6\r\nM  ZZC   7 4\r\nM  ZZC   8 10\r\nM  ZZC   9 12\r\nM  ZZC  10 5\r\nM  ZZC  11 7\r\nM  ZZC  12 9\r\nM  ZZC  13 17\r\nM  ZZC  14 16\r\nM  ZZC  15 8\r\nM  ZZC  16 15\r\nM  ZZC  17 13\r\nM  ZZC  18 14\r\nM  ZZC  19 19\r\nM  ZZC  20 11\r\nM  ZZC  21 21\r\nM  ZZC  22 18\r\nM  ZZC  23 20\r\nM  END\r\n$$$$\r\n',
    atomsInfo: [
      {
        id: '1',
        index: 0,
        label: '4a(2.50)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '2',
        index: 1,
        label: '4b(2.91)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '3',
        index: 2,
        label: '1',
      },
      {
        id: '4',
        index: 3,
        label: '2',
      },
      {
        id: '5',
        index: 4,
        label: '3',
      },
      {
        id: '6',
        index: 5,
        label: '6(4.64)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '6-1',
        index: 5,
        label: '6(4.64)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '7',
        index: 6,
        label: '4',
      },
      {
        id: '8',
        index: 7,
        label: '10',
      },
      {
        id: '9',
        index: 8,
        label: '12',
      },
      {
        id: '10',
        index: 9,
        label: '5(4.04)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '10-1',
        index: 9,
        label: '5(4.04)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '11',
        index: 10,
        label: '7(6.00)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '11-1',
        index: 10,
        label: '7(6.00)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '12',
        index: 11,
        label: '9(5.91)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '12-1',
        index: 11,
        label: '9(5.91)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '13',
        index: 12,
        label: '17(6.91)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '13-1',
        index: 12,
        label: '17(6.91)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '14',
        index: 13,
        label: '16',
      },
      {
        id: '15',
        index: 14,
        label: '8',
      },
      {
        id: '16',
        index: 15,
        label: '15',
      },
      {
        id: '17',
        index: 16,
        label: '13(6.73)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '17-1',
        index: 16,
        label: '13(6.73)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '18',
        index: 17,
        label: '14(6.78)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '18-1',
        index: 17,
        label: '14(6.78)',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '19',
        index: 18,
        label: '19',
      },
      {
        id: '19-1',
        index: 18,
        label: '19',
      },
      {
        id: '20',
        index: 19,
        label: '11',
      },
      {
        id: '20-1',
        index: 19,
        label: '11',
      },
      {
        id: '21',
        index: 20,
        label: '21',
      },
      {
        id: '21-1',
        index: 20,
        label: '21',
      },
      {
        id: '22',
        index: 21,
        label: '18',
      },
      {
        id: '22-1',
        index: 21,
        label: '18',
      },
      {
        id: '23',
        index: 22,
        label: '20',
      },
      {
        id: '23-1',
        index: 22,
        label: '20',
      },
    ],
    atomsDecorations: {},
    corrArrowsInfo: [
      {
        id: 'corrArrow_0',
        begin: 12,
        end: 16,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   17(6.71)  -  13(6.58); J=1.94 Hz',
      },
      {
        id: 'corrArrow_1',
        begin: 16,
        end: 17,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   14(6.68)  -  13(6.58); J=8.10 Hz',
      },
      {
        id: 'corrArrow_2',
        begin: 11,
        end: 10,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   7(5.88)  -  9(5.68); J=2.27 Hz',
      },
      {
        id: 'corrArrow_3',
        begin: 5,
        end: 9,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   6(4.47)  -  5(3.81); J=7.59 Hz',
      },
      {
        id: 'corrArrow_4',
        begin: 1,
        end: 9,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   5(3.81)  -  4b(2.64); J=5.34 Hz',
      },
      {
        id: 'corrArrow_5',
        begin: 0,
        end: 9,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   5(3.81)  -  4a(2.34); J=7.89 Hz',
      },
      {
        id: 'corrArrow_6',
        begin: 0,
        end: 1,
        color: 'Violet',
        dash: false,
        arrowType: 'forward_back',
        hintText: 'standard 1H:\r\n   4b(2.64)  -  4a(2.34); J=16.01 Hz',
      },
    ],
    highlightedAtoms: [],
    fixStructureSize: true,
    fixStructureFont: 14,
  },
  width: 1000,
  height: 1000,
  svg,
};
