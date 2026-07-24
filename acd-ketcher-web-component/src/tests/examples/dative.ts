import svg from './dative-short.svg';
import { TestCaseData } from '../renderer.model';

export const testData: TestCaseData = {
  name: 'dative_short',
  model: {
    molFile:
      '\r\n  ACD/Labs03262508482D\r\n\r\n  0  0  0  0  0  0  0  0  0  0999 V3000\r\nM  V30 BEGIN CTAB\r\nM  V30 COUNTS 52 56 0 0 0\r\nM  V30 BEGIN ATOM\r\nM  V30 1 C 22.1796 -11.7323 0 0\r\nM  V30 2 O 25.5363 -8.0084 0 0\r\nM  V30 3 O 23.5034 -9.5963 0 0\r\nM  V30 4 C 22.0168 -13.0712 0 0\r\nM  V30 5 C 20.9196 -12.5136 0 0\r\nM  V30 6 C 22.0168 -14.4216 0 0\r\nM  V30 7 C 19.9182 -13.3419 0 0\r\nM  V30 8 C 21.0323 -15.2723 0 0\r\nM  V30 9 C 19.8103 -14.6471 0 0\r\nM  V30 10 C 25.6261 -13.4076 0 0\r\nM  V30 11 C 25.8775 -12.0747 0 0\r\nM  V30 12 C 24.286 -13.6699 0 0\r\nM  V30 13 C 24.8201 -11.385 0 0\r\nM  V30 14 C 23.3515 -12.7318 0 0\r\nM  V30 15 C 23.4854 -11.3693 0 0\r\nM  V30 16 C 17.5364 -4.1091 0 0\r\nM  V30 17 C 20.8256 -6.7424 0 0\r\nM  V30 18 P 21.25 -9.2111 0 0\r\nM  V30 19 C 15.7043 -8.1308 0 0\r\nM  V30 20 C 19.7302 -11.2777 0 0\r\nM  V30 21 C 19.9393 -9.9924 0 0\r\nM  V30 22 C 18.5419 -9.5945 0 0\r\nM  V30 23 C 17.5008 -10.4108 0 0\r\nM  V30 24 C 17.5183 -11.7703 0 0\r\nM  V30 25 C 18.759 -12.176 0 0\r\nM  V30 26 C 18.229 -8.2556 0 0\r\nM  V30 27 C 16.9751 -7.7522 0 0\r\nM  V30 28 C 16.7641 -6.4151 0 0\r\nM  V30 29 C 17.5755 -5.4396 0 0\r\nM  V30 30 C 18.7939 -5.758 0 0\r\nM  V30 31 C 19.281 -7.0185 0 0\r\nM  V30 32 C 16.3704 -3.4333 0 0\r\nM  V30 33 C 18.6776 -3.4261 0 0\r\nM  V30 34 C 21.3892 -5.4704 0 0\r\nM  V30 35 C 21.4441 -7.7432 0 0\r\nM  V30 36 C 20.2685 -7.9765 0 0\r\nM  V30 37 C 18.8379 -7.6141 0 0\r\nM  V30 38 C 20.1003 -6.3807 0 0\r\nM  V30 39 C 19.7223 -8.8789 0 0\r\nM  V30 40 C 22.4726 -8.3255 0 0\r\nM  V30 41 C 23.3937 -7.2548 0 0\r\nM  V30 42 C 23.7392 -8.0494 0 0\r\nM  V30 43 C 22.5732 -6.8702 0 0\r\nM  V30 44 C 14.8615 -7.0155 0 0\r\nM  V30 45 C 14.794 -9.0954 0 0\r\nM  V30 46 Pd 22.4074 -10.28 0 0\r\nM  V30 47 N 21.2584 -10.8889 0 0\r\nM  V30 48 S 24.8213 -9.1466 0 0\r\nM  V30 49 C 26.0782 -9.7266 0 0\r\nM  V30 50 O 24.2932 -10.1305 0 0\r\nM  V30 51 C 16.2034 -10.1884 0 0\r\nM  V30 52 O 20.9087 -11.6985 0 0\r\nM  V30 END ATOM\r\nM  V30 BEGIN BOND\r\nM  V30 1 1 1 52\r\nM  V30 2 2 2 48\r\nM  V30 3 1 3 46\r\nM  V30 4 1 3 48\r\nM  V30 5 1 4 5\r\nM  V30 6 2 4 6\r\nM  V30 7 1 4 14\r\nM  V30 8 2 5 7\r\nM  V30 9 1 5 47\r\nM  V30 10 1 6 8\r\nM  V30 11 1 7 9\r\nM  V30 12 2 8 9\r\nM  V30 13 1 10 11\r\nM  V30 14 2 10 12\r\nM  V30 15 2 11 13\r\nM  V30 16 1 12 14\r\nM  V30 17 1 13 15\r\nM  V30 18 2 14 15\r\nM  V30 19 1 15 46\r\nM  V30 20 1 16 29\r\nM  V30 21 1 16 32\r\nM  V30 22 1 16 33\r\nM  V30 23 1 17 31\r\nM  V30 24 1 17 34\r\nM  V30 25 1 17 35\r\nM  V30 26 1 18 21\r\nM  V30 27 1 18 36\r\nM  V30 28 1 18 40\r\nM  V30 29 9 18 46 DISP=DATIVE\r\nM  V30 30 1 19 27\r\nM  V30 31 1 19 44\r\nM  V30 32 1 19 45\r\nM  V30 33 2 20 21\r\nM  V30 34 1 20 25\r\nM  V30 35 1 20 52\r\nM  V30 36 1 21 22\r\nM  V30 37 2 22 23\r\nM  V30 38 1 22 26\r\nM  V30 39 1 23 24\r\nM  V30 40 1 23 51\r\nM  V30 41 2 24 25\r\nM  V30 42 2 26 27\r\nM  V30 43 1 26 31\r\nM  V30 44 1 27 28\r\nM  V30 45 2 28 29\r\nM  V30 46 1 29 30\r\nM  V30 47 2 30 31\r\nM  V30 48 1 36 37\r\nM  V30 49 1 36 38\r\nM  V30 50 1 36 39\r\nM  V30 51 1 40 41\r\nM  V30 52 1 40 42\r\nM  V30 53 1 40 43\r\nM  V30 54 9 47 46 DISP=DATIVE\r\nM  V30 55 1 48 49\r\nM  V30 56 2 48 50\r\nM  V30 END BOND\r\nM  V30 END CTAB\r\nM  END\r\n',
    atomsInfo: [],
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
