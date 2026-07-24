import svg from './markush-loss.svg';
import svgHighlightedAtoms from './markush-loss-highlighted.svg';
import { TestCaseData } from '../renderer.model';
export { svgHighlightedAtoms };

export const testData: TestCaseData = {
  name: 'markush_loss',
  model: {
    molFile:
      '\r\n  ACD/LABS10242414312D\r\n\r\n  0  0  0  0  0  0  0  0  0  0999 V3000\r\nM  V30 BEGIN CTAB\r\nM  V30 COUNTS 30 32 0 0 0\r\nM  V30 BEGIN ATOM\r\nM  V30 1 N 9.2501 -4.617 0 0 ACDNUM=1 ACDMARKUSH=(29 30 1 2 3 4 5 6 7 8 9 10 -\r\nM  V30 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28)\r\nM  V30 2 C 9.2501 -5.9892 0 0 ACDNUM=2\r\nM  V30 3 C 8.1039 -6.6349 0 0 ACDNUM=3\r\nM  V30 4 N 6.9093 -5.9892 0 0 ACDNUM=4\r\nM  V30 5 C 6.9093 -4.617 0 0 ACDNUM=5\r\nM  V30 6 C 8.1039 -4.0197 0 0 ACDNUM=6\r\nM  V30 7 C 10.4447 -4.0197 0 0 ACDNUM=7\r\nM  V30 8 C 10.4447 -2.6636 0 0 ACDNUM=8\r\nM  V30 9 C 9.2501 -1.9533 0 0 ACDNUM=9\r\nM  V30 10 C 9.2501 -0.6457 0 0 ACDNUM=10\r\nM  V30 11 C 10.4447 0 0 0 ACDNUM=11\r\nM  V30 12 C 11.5263 -0.6457 0 0 ACDNUM=12\r\nM  V30 13 C 11.5263 -1.9533 0 0 ACDNUM=13\r\nM  V30 14 C 5.7632 -6.6349 0 0 ACDNUM=14\r\nM  V30 15 C 4.617 -5.9892 0 0 ACDNUM=15\r\nM  V30 16 C 3.487 -6.6349 0 0 ACDNUM=16\r\nM  V30 17 C 2.3408 -5.9892 0 0 ACDNUM=17\r\nM  V30 18 C 2.3408 -4.617 0 0 ACDNUM=18\r\nM  V30 19 C 1.1462 -4.0197 0 0 ACDNUM=19\r\nM  V30 20 C 0 -4.617 0 0 ACDNUM=20\r\nM  V30 21 C 0 -5.9892 0 0 ACDNUM=21\r\nM  V30 22 C 1.1462 -6.6349 0 0 ACDNUM=22\r\nM  V30 23 C 11.5263 -4.617 0 0 ACDNUM=23\r\nM  V30 24 C 12.7209 -4.0197 0 0 ACDNUM=24\r\nM  V30 25 C 13.8671 -4.617 0 0 ACDNUM=25\r\nM  V30 26 C 13.8671 -5.9892 0 0 ACDNUM=26\r\nM  V30 27 C 12.7209 -6.6349 0 0 ACDNUM=27\r\nM  V30 28 C 11.5263 -5.9892 0 0 ACDNUM=28\r\nM  V30 29 R 6.3605 -2.1793 0 0 ACDNUM=29 ACDLAB=[-CH3]\r\nM  V30 30 * 9.4923 -3.4385 0 0\r\nM  V30 END ATOM\r\nM  V30 BEGIN BOND\r\nM  V30 1 1 1 7\r\nM  V30 2 1 1 2\r\nM  V30 3 1 1 6\r\nM  V30 4 1 2 3\r\nM  V30 5 1 3 4\r\nM  V30 6 1 4 5\r\nM  V30 7 1 4 14\r\nM  V30 8 1 5 6\r\nM  V30 9 1 7 8\r\nM  V30 10 1 7 23\r\nM  V30 11 1 8 9\r\nM  V30 12 2 8 13\r\nM  V30 13 2 9 10\r\nM  V30 14 1 10 11\r\nM  V30 15 2 11 12\r\nM  V30 16 1 12 13\r\nM  V30 17 1 14 15\r\nM  V30 18 2 15 16\r\nM  V30 19 1 16 17\r\nM  V30 20 2 17 18\r\nM  V30 21 1 17 22\r\nM  V30 22 1 18 19\r\nM  V30 23 2 19 20\r\nM  V30 24 1 20 21\r\nM  V30 25 2 21 22\r\nM  V30 26 2 23 24\r\nM  V30 27 1 23 28\r\nM  V30 28 1 24 25\r\nM  V30 29 2 25 26\r\nM  V30 30 1 26 27\r\nM  V30 31 2 27 28\r\nM  V30 32 10 29 30 ACDBDTYP=20 DISP=HBOND1 ENDPTS=(28 1 2 3 4 5 6 7 8 9 10 11 -\r\nM  V30 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28) ATTACH=ANY\r\nM  V30 END BOND\r\nM  V30 END CTAB\r\nM  END\r\n$$$$\r\n',
    atomsInfo: [
      {
        id: '1',
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
        id: '5-2',
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
      {
        id: '7',
        index: 6,
        label: '7',
      },
      {
        id: '7-1',
        index: 6,
        label: '7',
      },
      {
        id: '8',
        index: 7,
        label: '8',
      },
      {
        id: '9',
        index: 8,
        label: '9',
      },
      {
        id: '9-1',
        index: 8,
        label: '9',
      },
      {
        id: '10',
        index: 9,
        label: '10',
      },
      {
        id: '10-1',
        index: 9,
        label: '10',
      },
      {
        id: '11',
        index: 10,
        label: '11',
      },
      {
        id: '11-1',
        index: 10,
        label: '11',
      },
      {
        id: '12',
        index: 11,
        label: '12',
      },
      {
        id: '12-1',
        index: 11,
        label: '12',
      },
      {
        id: '13',
        index: 12,
        label: '13',
      },
      {
        id: '13-1',
        index: 12,
        label: '13',
      },
      {
        id: '14',
        index: 13,
        label: '14',
      },
      {
        id: '14-1',
        index: 13,
        label: '14',
      },
      {
        id: '14-2',
        index: 13,
        label: '14',
      },
      {
        id: '15',
        index: 14,
        label: '15',
      },
      {
        id: '15-1',
        index: 14,
        label: '15',
      },
      {
        id: '16',
        index: 15,
        label: '16',
      },
      {
        id: '16-1',
        index: 15,
        label: '16',
      },
      {
        id: '17',
        index: 16,
        label: '17',
      },
      {
        id: '18',
        index: 17,
        label: '18',
      },
      {
        id: '18-1',
        index: 17,
        label: '18',
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
        label: '20',
      },
      {
        id: '20-1',
        index: 19,
        label: '20',
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
        label: '22',
      },
      {
        id: '22-1',
        index: 21,
        label: '22',
      },
      {
        id: '23',
        index: 22,
        label: '23',
      },
      {
        id: '24',
        index: 23,
        label: '24',
      },
      {
        id: '24-1',
        index: 23,
        label: '24',
      },
      {
        id: '25',
        index: 24,
        label: '25',
      },
      {
        id: '25-1',
        index: 24,
        label: '25',
      },
      {
        id: '26',
        index: 25,
        label: '26',
      },
      {
        id: '26-1',
        index: 25,
        label: '26',
      },
      {
        id: '27',
        index: 26,
        label: '27',
      },
      {
        id: '27-1',
        index: 26,
        label: '27',
      },
      {
        id: '28',
        index: 27,
        label: '28',
      },
      {
        id: '28-1',
        index: 27,
        label: '28',
      },
      {
        id: '29',
        index: 28,
        label: '29',
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
