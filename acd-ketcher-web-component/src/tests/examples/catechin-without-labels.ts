import { TestCaseData } from '../renderer.model';
import svg from './catechin-without-labels.svg';

export const testData: TestCaseData = {
  name: 'catechinWithoutLabels',
  model: {
    molFile:
      '\r\n  ACD/LABS02072306332D\r\n\r\n 23 25  0  0  1  0  0  0  0  0 24 V2000\r\n  411.7466 -440.4540    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\r\n  320.7030 -433.8923    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\r\n  364.1743 -159.1212    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  273.9509 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  273.9509 -314.9615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  456.0380 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  364.1743 -369.0955    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  182.0872 -369.0955    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  546.2614 -159.1212    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  456.0380 -314.9615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  182.0872 -159.1212    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   91.8638 -314.9615    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  638.1251 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  728.3485 -159.1212    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   91.8638 -209.9743    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  728.3485  -54.1340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  546.2614  -54.1340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  638.1251    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  182.0872 -474.0827    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  546.2614 -369.0955    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  820.2123 -209.9743    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n    0.0000 -159.1212    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  820.2123    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  7  1  1  6  0  0  0\r\n  7  2  1  1  0  0  0\r\n  3  4  1  0  0  0  0\r\n  3  6  1  0  0  0  0\r\n  4  5  2  0  0  0  0\r\n  4 11  1  0  0  0  0\r\n  5  8  1  0  0  0  0\r\n  5  7  1  0  0  0  0\r\n  6  9  1  6  0  0  0\r\n  6 10  1  0  0  0  0\r\n  7 10  1  0  0  0  0\r\n  8 19  1  0  0  0  0\r\n  8 12  2  0  0  0  0\r\n  9 13  2  0  0  0  0\r\n  9 17  1  0  0  0  0\r\n 10 20  1  1  0  0  0\r\n 11 15  2  0  0  0  0\r\n 12 15  1  0  0  0  0\r\n 13 14  1  0  0  0  0\r\n 14 21  1  0  0  0  0\r\n 14 16  2  0  0  0  0\r\n 15 22  1  0  0  0  0\r\n 16 18  1  0  0  0  0\r\n 16 23  1  0  0  0  0\r\n 17 18  2  0  0  0  0\r\nM  ZZC   1 4a\r\nM  ZZC   2 4b\r\nM  ZZC   3 1\r\nM  ZZC   4 2\r\nM  ZZC   5 3\r\nM  ZZC   6 6\r\nM  ZZC   7 4\r\nM  ZZC   8 10\r\nM  ZZC   9 12\r\nM  ZZC  10 5\r\nM  ZZC  11 7\r\nM  ZZC  12 9\r\nM  ZZC  13 17\r\nM  ZZC  14 16\r\nM  ZZC  15 8\r\nM  ZZC  16 15\r\nM  ZZC  17 13\r\nM  ZZC  18 14\r\nM  ZZC  19 19\r\nM  ZZC  20 11\r\nM  ZZC  21 21\r\nM  ZZC  22 18\r\nM  ZZC  23 20\r\nM  END\r\n$$$$\r\n',
    atomsInfo: [
      {
        id: '1',
        index: 0,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '2',
        index: 1,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '3',
        index: 2,
        label: '',
      },
      {
        id: '4',
        index: 3,
        label: '',
      },
      {
        id: '5',
        index: 4,
        label: '',
      },
      {
        id: '6',
        index: 5,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '6-1',
        index: 5,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '7',
        index: 6,
        label: '',
      },
      {
        id: '8',
        index: 7,
        label: '',
      },
      {
        id: '9',
        index: 8,
        label: '',
      },
      {
        id: '10',
        index: 9,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '10-1',
        index: 9,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '11',
        index: 10,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '11-1',
        index: 10,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '12',
        index: 11,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '12-1',
        index: 11,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '13',
        index: 12,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '13-1',
        index: 12,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '14',
        index: 13,
        label: '',
      },
      {
        id: '15',
        index: 14,
        label: '',
      },
      {
        id: '16',
        index: 15,
        label: '',
      },
      {
        id: '17',
        index: 16,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '17-1',
        index: 16,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '18',
        index: 17,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '18-1',
        index: 17,
        label: '',
        customCssLabelStyle: {
          'font-weight': 'bold',
          fill: 'green',
        },
      },
      {
        id: '19',
        index: 18,
        label: '',
      },
      {
        id: '19-1',
        index: 18,
        label: '',
      },
      {
        id: '20',
        index: 19,
        label: '',
      },
      {
        id: '20-1',
        index: 19,
        label: '',
      },
      {
        id: '21',
        index: 20,
        label: '',
      },
      {
        id: '21-1',
        index: 20,
        label: '',
      },
      {
        id: '22',
        index: 21,
        label: '',
      },
      {
        id: '22-1',
        index: 21,
        label: '',
      },
      {
        id: '23',
        index: 22,
        label: '',
      },
      {
        id: '23-1',
        index: 22,
        label: '',
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
  svg,
};
