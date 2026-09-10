import {
  Struct,
  MolSerializer,
  StructServiceProvider,
  DefaultStructServiceOptions,
  ChemicalMimeType,
  KetSerializer,
  StructService,
  GenerateImageOptions,
} from 'ketcher-core';
import { IKCGenerateImageOptions, IKCNullable } from '../kc-types';
import { buildSvgElement, makeIdsUnique, svgElemToSvgString } from './svg-utils';
import { base64Decode, base64Encode } from './base64';

export function findMarkushShadows(struct: Struct): Map<number, number[]> | null {
  let result: Map<number, number[]> | null = null;
  struct.bonds.forEach((bond) => {
    if (bond.attach === 'ANY' && bond.endPts) {
      if (!result) {
        result = new Map<number, number[]>();
      }
      result.set(bond.end, bond.endPts);
    }
  });

  return result;
}

class StructServiceCreator {
  private static srv: IKCNullable<Promise<StructService>>;

  public static async getStructService(): Promise<StructService> {
    StructServiceCreator.srv ??= import('ketcher-standalone').then((k) => {
      const structServiceProvider =
        new k.StandaloneStructServiceProvider() as StructServiceProvider;
      return structServiceProvider.createStructService(DefaultStructServiceOptions);
    });

    return StructServiceCreator.srv;
  }
}

export class StructDeserializer {
  private mMolFile: IKCNullable<string>;

  private async deserializeStructAsync(): Promise<Struct | undefined> {
    const molFile = this.mMolFile;
    if (!molFile) {
      return undefined;
    }

    let struct = new MolSerializer().deserialize(molFile);

    if ((molFile?.includes('$RXN') || molFile?.includes('V3000')) && !findMarkushShadows(struct)) {
      const srv = await StructServiceCreator.getStructService();
      const ketStruct = await srv
        .convert({
          struct: molFile,
          output_format: ChemicalMimeType.KET,
        })
        .catch(() => {
          return undefined;
        });
      if (ketStruct) {
        struct = new KetSerializer().deserialize(ketStruct.struct);
      }
    }
    return struct;
  }

  private deserializeStruct: IKCNullable<Promise<Struct | undefined>>;

  public setMolFile(molFile: IKCNullable<string>) {
    this.mMolFile = molFile;
    this.deserializeStruct = null;
  }

  public acquireStruct(): Promise<Struct | undefined> {
    if (!this.deserializeStruct) {
      this.deserializeStruct = this.deserializeStructAsync();
    }

    return this.deserializeStruct;
  }

  public dispose() {
    // this.#srv?.destroy?.();
  }
}

export async function generateImageAsBase64(
  data: string,
  options?: IKCGenerateImageOptions | undefined,
): Promise<string> {
  const srv = await StructServiceCreator.getStructService();
  const svgString = await srv.generateImageAsBase64(data, options as GenerateImageOptions);
  if (!svgString) {
    return '';
  }

  const svgElem = buildSvgElement(base64Decode(svgString));
  if (!svgElem) {
    return '';
  }

  const uniqueIdsElement = makeIdsUnique(svgElem);

  return base64Encode(svgElemToSvgString(uniqueIdsElement));
}
