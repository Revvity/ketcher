import { TestCaseData } from '../renderer.model';
import svg from './r-aliased.svg';

export const testData: TestCaseData = {
  name: 'r-aliased',
  model: {
    molFile:
      '\r\n  ACD/LABS09122316152D\r\n\r\n 40 45  0  0  0  0  0  0  0  0107 V2000\r\n    2.9467   -2.1396    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n    1.9144   -2.9467    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    0.5818   -2.6464    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    0.0000   -1.5390    0.0000 Q   0  0  0  0  0  0  0  0  0  0  0  0\r\n    2.9467   -0.8070    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    0.5818   -0.3003    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    1.9144    0.0000    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    4.1291   -2.7214    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n    5.1613   -1.9144    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    6.4751   -2.2147    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    7.0007   -3.3783    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    4.1291   -4.1291    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    6.4751   -4.6358    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    5.1613   -4.9361    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    7.2071   -5.6681    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    8.5397   -5.2927    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    9.5720   -6.1749    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    9.6470   -7.4323    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    6.7004   -6.8505    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n    8.5397   -8.3145    0.0000 A   0  0  0  0  0  0  0  0  0  0  0  0\r\n    7.2071   -8.0142    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   10.8107   -8.0142    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   11.8430   -7.2071    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   13.1004   -7.4323    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   13.6823   -8.6898    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   10.8107   -9.4218    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   13.1755   -9.8535    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   11.8430  -10.2289    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   13.9826  -10.8858    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   15.3151  -10.6793    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   16.1973  -11.7116    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   15.7468  -12.9503    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   14.4330  -13.1755    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   13.5509  -12.1432    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   16.6289  -13.9075    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   17.8864  -13.6823    0.0000 X   0  0  0  0  0  0  0  0  0  0  0  0\r\n   18.7685  -14.7145    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   18.3181  -15.9720    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   17.0043  -16.1973    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n   16.1973  -15.2401    0.0000 R   0  0  0  0  0  0  0  0  0  0  0  0\r\n  1  5  1  0  0  0  0\r\n  1  2  1  0  0  0  0\r\n  1  8  1  0  0  0  0\r\n  2  3  1  0  0  0  0\r\n  3  4  1  0  0  0  0\r\n  4  6  1  0  0  0  0\r\n  5  7  1  0  0  0  0\r\n  6  7  1  0  0  0  0\r\n  8 12  1  0  0  0  0\r\n  8  9  1  0  0  0  0\r\n  9 10  1  0  0  0  0\r\n 10 11  1  0  0  0  0\r\n 11 13  1  0  0  0  0\r\n 12 14  1  0  0  0  0\r\n 13 14  1  0  0  0  0\r\n 13 15  1  0  0  0  0\r\n 15 19  1  0  0  0  0\r\n 15 16  1  0  0  0  0\r\n 16 17  1  0  0  0  0\r\n 17 18  1  0  0  0  0\r\n 18 20  1  0  0  0  0\r\n 18 22  1  0  0  0  0\r\n 19 21  1  0  0  0  0\r\n 20 21  1  0  0  0  0\r\n 22 26  1  0  0  0  0\r\n 22 23  1  0  0  0  0\r\n 23 24  1  0  0  0  0\r\n 24 25  1  0  0  0  0\r\n 25 27  1  0  0  0  0\r\n 26 28  1  0  0  0  0\r\n 27 28  1  0  0  0  0\r\n 27 29  1  0  0  0  0\r\n 29 30  1  0  0  0  0\r\n 29 34  1  0  0  0  0\r\n 30 31  1  0  0  0  0\r\n 31 32  1  0  0  0  0\r\n 32 33  1  0  0  0  0\r\n 32 35  1  0  0  0  0\r\n 33 34  1  0  0  0  0\r\n 35 36  1  0  0  0  0\r\n 35 40  1  0  0  0  0\r\n 36 37  1  0  0  0  0\r\n 37 38  1  0  0  0  0\r\n 38 39  1  0  0  0  0\r\n 39 40  1  0  0  0  0\r\nM  ZZC   1 1\r\nA    2\r\nCEL\r\nM  ZZC   2 2\r\nA    3\r\nCAH\r\nM  ZZC   3 3\r\nM  ZZC   4 4\r\nA    5\r\nHAR\r\nM  ZZC   5 5\r\nA    6\r\nARH\r\nM  ZZC   6 6\r\nA    7\r\nHAH\r\nM  ZZC   7 7\r\nM  ZZC   8 8\r\nA    9\r\nACH\r\nM  ZZC   9 9\r\nA   10\r\nAHC\r\nM  ZZC  10 10\r\nA   11\r\nABH\r\nM  ZZC  11 11\r\nA   12\r\nACY\r\nM  ZZC  12 12\r\nA   13\r\nABC\r\nM  ZZC  13 13\r\nA   14\r\nAHH\r\nM  ZZC  14 14\r\nA   15\r\nAYL\r\nM  ZZC  15 15\r\nA   16\r\nAOH\r\nM  ZZC  16 16\r\nA   17\r\nALH\r\nM  ZZC  17 17\r\nA   18\r\nALK\r\nM  ZZC  18 18\r\nA   19\r\nAYH\r\nM  ZZC  19 19\r\nM  ZZC  20 20\r\nA   21\r\nAOX\r\nM  ZZC  21 21\r\nA   22\r\nCYC\r\nM  ZZC  22 22\r\nA   23\r\nAEL\r\nM  ZZC  23 23\r\nA   24\r\nAEH\r\nM  ZZC  24 24\r\nA   25\r\nCXH\r\nM  ZZC  25 25\r\nA   26\r\nCYH\r\nM  ZZC  26 26\r\nA   27\r\nQH\r\nM  ZZC  27 27\r\nA   28\r\nCXX\r\nM  ZZC  28 28\r\nA   29\r\nCBC\r\nM  ZZC  29 29\r\nA   30\r\nCBH\r\nM  ZZC  30 30\r\nA   31\r\nCHC\r\nM  ZZC  31 31\r\nM  ZZC  32 32\r\nA   33\r\nCHH\r\nM  ZZC  33 33\r\nA   34\r\nM\r\nM  ZZC  34 34\r\nA   35\r\nARY\r\nM  ZZC  35 35\r\nM  ZZC  36 36\r\nA   37\r\nCEH\r\nM  ZZC  37 37\r\nM  ZZC  38 38\r\nA   39\r\nPol\r\nM  ZZC  39 39\r\nA   40\r\n[Fe,Os,Ru]\r\nM  ZZC  40 40\r\nM  END\r\n$$$$\r\n',
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
        id: '3',
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
        id: '6',
        index: 5,
        label: '6',
      },
      {
        id: '7',
        index: 6,
        label: '7',
      },
      {
        id: '8',
        index: 7,
        label: '8',
      },
      {
        id: '8-1',
        index: 7,
        label: '8',
      },
      {
        id: '9',
        index: 8,
        label: '9',
      },
      {
        id: '10',
        index: 9,
        label: '10',
      },
      {
        id: '11',
        index: 10,
        label: '11',
      },
      {
        id: '12',
        index: 11,
        label: '12',
      },
      {
        id: '13',
        index: 12,
        label: '13',
      },
      {
        id: '14',
        index: 13,
        label: '14',
      },
      {
        id: '15',
        index: 14,
        label: '15',
      },
      {
        id: '16',
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
        id: '19',
        index: 18,
        label: '19',
      },
      {
        id: '20',
        index: 19,
        label: '20',
      },
      {
        id: '21',
        index: 20,
        label: '21',
      },
      {
        id: '22',
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
        id: '25',
        index: 24,
        label: '25',
      },
      {
        id: '26',
        index: 25,
        label: '26',
      },
      {
        id: '27',
        index: 26,
        label: '27',
      },
      {
        id: '28',
        index: 27,
        label: '28',
      },
      {
        id: '29',
        index: 28,
        label: '29',
      },
      {
        id: '30',
        index: 29,
        label: '30',
      },
      {
        id: '31',
        index: 30,
        label: '31',
      },
      {
        id: '32',
        index: 31,
        label: '32',
      },
      {
        id: '32-1',
        index: 31,
        label: '32',
      },
      {
        id: '33',
        index: 32,
        label: '33',
      },
      {
        id: '34',
        index: 33,
        label: '34',
      },
      {
        id: '35',
        index: 34,
        label: '35',
      },
      {
        id: '36',
        index: 35,
        label: '36',
      },
      {
        id: '37',
        index: 36,
        label: '37',
      },
      {
        id: '38',
        index: 37,
        label: '38',
      },
      {
        id: '39',
        index: 38,
        label: '39',
      },
      {
        id: '40',
        index: 39,
        label: '40',
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
