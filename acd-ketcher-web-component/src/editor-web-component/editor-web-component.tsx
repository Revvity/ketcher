/* eslint-disable camelcase */
import React from 'react';
import { Editor, couldBeSaved } from 'ketcher-react';
import {
  Bond,
  Ketcher,
  MolSerializer,
  prepareStructToRender,
  Struct,
  SupportedFormat,
  CoreEditor,
  ketcherProvider,
} from 'ketcher-core';
import { IKCEditor, IKCNullable, KCFormat } from '../kc-types.d';
import { createRoot, Root } from 'react-dom/client';
import '../editor-styles.scss';

declare global {
  let __webpack_public_path__: string;
  interface Window {
    ketcher: Ketcher;
    isPolymerEditorTurnedOn: boolean;
  }
}

function removeBackslash(str: string): string {
  if (str.endsWith('/')) {
    return str.slice(0, str.length - 1);
  }
  return str;
}

class EditorWebComponent extends HTMLElement implements IKCEditor {
  private molFile: string | undefined;
  private ketcher?: Ketcher;
  private ketcherInitializedResolve?: () => void;
  private ketcherInitialized = new Promise<void>(
    (resolve) => (this.ketcherInitializedResolve = resolve),
  );

  private root?: Root;

  public connectedCallback(): void {
    if (window.ketcher || ketcherProvider.getKetcher()) {
      throw Error(
        'Ketcher is initialized already. Multiple instance of acd-ketcher-editor is not supported',
      );
    }

    __webpack_public_path__ = window.KETCHER_STATIC_RESOURCES_URL ?? '';
    import('ketcher-standalone').then((k) => {
      this.root = createRoot(this);
      this.root.render(
        <Editor
          staticResourcesUrl={removeBackslash(window.KETCHER_STATIC_RESOURCES_URL ?? '')}
          structServiceProvider={new k.StandaloneStructServiceProvider()}
          onInit={async (ketcher) => {
            if (this.ketcher) {
              this.molFile = (await this.getMolFile()) ?? '';
            }
            this.ketcher = ketcher;
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            window.ketcher = ketcher;
            this.initializeKetcher().catch(console.error);
          }}
          onUnmount={() => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            window.ketcher = null!;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ketcherProvider.removeKetcherInstance(this.ketcher?.id);
          }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          errorHandler={() => {}}
        />,
      );
    });
  }

  public disconnectedCallback(): void {
    this.root?.unmount();
    this.root = undefined;
  }

  private V3000Required(): boolean {
    const struct = this.ketcher?.editor.struct();
    if (!struct) {
      return false;
    }

    if (
      struct.bonds.some(
        (b) => b.type === Bond.PATTERN.TYPE.HYDROGEN || b.type === Bond.PATTERN.TYPE.DATIVE,
      )
    ) {
      return true;
    }

    const warns = couldBeSaved(struct, SupportedFormat.mol);

    return !!warns;
  }

  private async getMolFileByFormat(format: KCFormat): Promise<IKCNullable<string>> {
    let mol;
    switch (format) {
      case KCFormat.MolFile2000:
        mol = await this.ketcher?.getMolfile('v2000');
        break;
      case KCFormat.MolFile3000:
        mol = await this.ketcher?.getMolfile('v3000');
        break;
      case KCFormat.Rxn:
        mol = await this.ketcher?.getRxn();
        break;
      default:
        mol = null;
    }
    return mol;
  }

  private async getMolFileAutodetect(): Promise<IKCNullable<string>> {
    let mol;
    try {
      mol = await this.ketcher?.getMolfile(this.V3000Required() ? 'v3000' : 'v2000');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      let error = e;
      if (!(e instanceof Error)) {
        error = new Error(e);
      }
      if (error.message === 'The structure cannot be saved as *.MOL due to reaction arrows.') {
        mol = await this.ketcher?.getRxn();
      } else {
        throw error;
      }
    }
    return mol;
  }

  public async getMolFile(format?: IKCNullable<KCFormat>): Promise<IKCNullable<string>> {
    if (window.isPolymerEditorTurnedOn) {
      const editor = CoreEditor.provideEditorInstance();
      editor.switchToMicromolecules();
    }

    if (!this.ketcher?.editor.struct() || this.ketcher?.editor.struct().isBlank()) {
      return Promise.resolve('');
    }
    return format ? this.getMolFileByFormat(format) : this.getMolFileAutodetect();
  }

  public async setMolFile(molFile: string): Promise<void> {
    if (this.ketcher) {
      await this.setStructure(molFile);
    } else {
      this.molFile = molFile;
    }
  }

  public onKetcherReady(): Promise<void> {
    return this.ketcherInitialized;
  }

  private getMoleculeFromSerializer(molFile: string): Struct {
    const struct = new MolSerializer().deserialize(molFile ?? '');
    struct.atoms.forEach((a) => {
      a.aam = 0;
    });
    // Order of method calls equal to the ketcher's prepareStructToRender
    struct.initHalfBonds();
    struct.initNeighbors();
    struct.setImplicitHydrogen();
    struct.markFragments();

    return struct;
  }

  private async setStructure(molFile: string) {
    let struct: Struct;
    if ((molFile.includes('$RXN') || molFile.includes('V3000')) && this.ketcher?.structService) {
      struct = await prepareStructToRender(
        molFile,
        this.ketcher?.structService,
        this.ketcher,
      ).catch(() => {
        return this.getMoleculeFromSerializer(molFile);
      });
    } else {
      struct = this.getMoleculeFromSerializer(molFile);
    }

    struct.rescale();
    this.ketcher?.editor.struct(struct);
    this.ketcher?.editor.zoomAccordingContent(struct);
    this.ketcher?.editor.centerStruct();

    // fix issue with half bond coordinates after centerStruct that causes bonds highlight problem
    this.ketcher?.editor.update(true);
  }

  private async initializeKetcher() {
    if (this.molFile) {
      await this.setStructure(this.molFile);
    }
    this.ketcherInitializedResolve?.();
  }
}

export function registerEditor(): void {
  customElements.define('acd-ketcher-editor', EditorWebComponent);
}
