import { Atom, Struct } from 'ketcher-core';

export function collectAtomsByMaxDist(
  struct: Struct,
  startAtomIndex: number,
  startFromSkelAtom: boolean,
  maxDist: number,
  neighborsAtomsMap = getNeighborsAtomsMap(struct),
): Set<number> {
  let dist = 0;
  let atomsOnCurLevel = new Set<number>();
  if (startFromSkelAtom) {
    atomsOnCurLevel.add(getSkelAtom(struct, neighborsAtomsMap, startAtomIndex));
  } else {
    atomsOnCurLevel.add(startAtomIndex);
  }

  if (dist === maxDist) {
    return atomsOnCurLevel;
  }

  const result = new Set<number>();
  while (atomsOnCurLevel.size > 0 && dist < maxDist) {
    const nextLevelAtoms = new Set<number>();
    for (const atomIndex of atomsOnCurLevel) {
      result.add(atomIndex);
      const neighbors = neighborsAtomsMap.get(atomIndex);
      if (!neighbors) continue;

      for (const neighborAtomIndex of neighbors) {
        if (result.has(neighborAtomIndex)) continue;
        result.add(neighborAtomIndex);
        nextLevelAtoms.add(neighborAtomIndex);
      }
    }
    atomsOnCurLevel = nextLevelAtoms;
    dist++;
  }
  return result;
}

export function getNeighborsAtomsMap(struct: Struct): Map<number, number[]> {
  const result = new Map<number, number[]>();

  function append(sourceN: number, destN: number): void {
    let list = result.get(sourceN);
    if (!list) {
      list = [];
      result.set(sourceN, list);
    }
    if (!list.includes(destN)) {
      list.push(destN);
    }
  }

  struct.bonds.forEach((b) => {
    append(b.begin, b.end);
    append(b.end, b.begin);
  });

  return result;
}

export function getSkelAtom(
  struct: Struct,
  neighborsAtomsMap: Map<number, number[]>,
  atomIndex: number,
): number {
  const atom = struct.atoms.get(atomIndex);
  // should never happen
  if (!atom || !isHydrogen(atom)) return atomIndex;

  const neighbors = neighborsAtomsMap.get(atomIndex);
  if (!neighbors || neighbors.length === 0) return atomIndex;

  return neighbors[0];
}

function isHydrogen(atom: Atom): boolean {
  return atom.label === 'H';
}
