import { MolSerializer, Struct } from 'ketcher-core';
import * as catechin from '../tests/examples/catechin';
import { collectAtomsByMaxDist } from './collect-atoms-by-max-dist';

function parseStruct(molFile: string | undefined): Struct {
  return new MolSerializer().deserialize(molFile ?? '');
}

function collectAtoms(
  molFile: string | undefined,
  startAtomIndex: number,
  startFromSkelAtom: boolean,
  maxDist: number,
): number[] {
  return Array.from(
    collectAtomsByMaxDist(parseStruct(molFile), startAtomIndex, startFromSkelAtom, maxDist),
  ).sort((a, b) => a - b);
}

describe('collectAtomsByMaxDist', () => {
  it('should work with cycles', () => {
    expect(collectAtoms(catechin.testData.model.molFile, 21, false, 4)).toEqual([
      2, 3, 4, 7, 10, 11, 14, 18, 21,
    ]);

    expect(collectAtoms(catechin.testData.model.molFile, 5, false, 1)).toEqual([2, 5, 8, 9]);
  });

  it('should consider skel atom', () => {
    expect(collectAtoms(catechin.testData.model.molFile, 1, false, 1)).toEqual([1, 6]);
    expect(collectAtoms(catechin.testData.model.molFile, 1, true, 1)).toEqual([0, 1, 4, 6, 9]);
  });
});
