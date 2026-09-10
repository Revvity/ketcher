import { buildSvgElement } from './svg-utils';
import { generateImageAsBase64 } from './struct-deserializer';
import { base64Decode } from './base64';

const molFile =
  '\r\n  ACD/LABS03222319292D\r\n\r\n 21 21  0  0  1  0  0  0  0  0 22 V2000\r\n  201.9623  -75.6180    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  201.9623  -45.9484    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  228.2186  -30.9824    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  255.0000  -45.9484    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  255.0000  -75.6180    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  228.2186  -90.8466    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  174.9184  -90.8466    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  148.1370  -75.6180    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  121.3557  -90.8466    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\r\n   95.3620  -75.6180    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   95.3620  -45.9484    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  148.1370  -45.9484    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n  173.8682  -30.9824    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  173.8682    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   69.3683  -90.8466    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   69.3683 -120.7788    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\r\n  121.3557  -30.9824    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n   43.3746  -75.6180    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   16.5932  -90.8466    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\r\n   16.5932 -120.7788    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n    0.0000  -76.2990    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\r\n  1  7  1  0  0  0  0\r\n  1  2  2  0  0  0  0\r\n  1  6  1  0  0  0  0\r\n  2  3  1  0  0  0  0\r\n  3  4  2  0  0  0  0\r\n  4  5  1  0  0  0  0\r\n  5  6  2  0  0  0  0\r\n  7  8  1  0  0  0  0\r\n  8  9  1  0  0  0  0\r\n  8 12  1  6  0  0  0\r\n  9 10  1  0  0  0  0\r\n 10 15  1  0  0  0  0\r\n 10 11  2  0  0  0  0\r\n 12 13  1  0  0  0  0\r\n 12 17  2  0  0  0  0\r\n 13 14  1  0  0  0  0\r\n 15 18  1  0  0  0  0\r\n 15 16  1  1  0  0  0\r\n 18 19  1  0  0  0  0\r\n 19 20  2  0  0  0  0\r\n 19 21  1  0  0  0  0\r\nM  ZZC   1 1\r\nM  ZZC   2 2\r\nM  ZZC   3 3\r\nM  ZZC   4 4\r\nM  ZZC   5 5\r\nM  ZZC   6 6\r\nM  ZZC   7 7\r\nM  ZZC   8 8\r\nM  ZZC   9 9\r\nM  ZZC  10 10\r\nM  ZZC  11 11\r\nM  ZZC  12 12\r\nM  ZZC  13 13\r\nM  ZZC  14 14\r\nM  ZZC  15 15\r\nM  ZZC  16 16\r\nM  ZZC  17 17\r\nM  ZZC  18 18\r\nM  ZZC  19 19\r\nM  ZZC  20 21\r\nM  ZZC  21 21\r\nM  END\r\n$$$$\r\n';

async function getIds(mol: string): Promise<string[]> {
  const svgStr = base64Decode(await generateImageAsBase64(mol, { outputFormat: 'svg' }));
  const element = buildSvgElement(svgStr);
  if (!element) {
    return [];
  }

  return Array.from(element.querySelectorAll('[id]')).map((el) => el.id);
}

describe('generateImageAsBase64 tests', () => {
  it('should generate svg', async () => {
    const svg = base64Decode(await generateImageAsBase64(molFile, { outputFormat: 'svg' }));
    expect(svg).not.toBe('');
  });

  it('should not generate element with same ids', async () => {
    const ids1 = await getIds(molFile);
    expect(ids1.length).toBe(13);

    const ids2 = await getIds(molFile);
    expect(ids2.length).toBe(13);

    const intersects = ids1.some((el) => ids2.includes(el));
    expect(intersects).toBe(false);
  });
});
