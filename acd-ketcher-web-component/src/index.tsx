import { IKCGenerateImageOptions } from './kc-types';

let rendererInitialized: Promise<void> | undefined;
let editorInitialized: Promise<void> | undefined;
let periodicTableInitialized: Promise<void> | undefined;

const registerRenderer = () => {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = window.KETCHER_STATIC_RESOURCES_URL ?? '';

  if (!rendererInitialized) {
    rendererInitialized = import('./renderer-web-component/renderer-web-component').then((m) => {
      m.registerRenderer();
    });
  }

  return rendererInitialized;
};

const registerEditor = () => {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = window.KETCHER_STATIC_RESOURCES_URL ?? '';

  if (!editorInitialized) {
    editorInitialized = import('./editor-web-component/editor-web-component').then((m) => {
      m.registerEditor();
    });
  }

  return editorInitialized;
};

const registerPeriodicTable = () => {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = window.KETCHER_STATIC_RESOURCES_URL ?? '';

  if (!periodicTableInitialized) {
    periodicTableInitialized = import(
      './periodic-table-web-component/periodic-table-web-component'
    ).then((m) => {
      m.registerPeriodicTable();
    });
  }

  return periodicTableInitialized;
};

const generateImageAsBase64 = (molFile: string, options?: IKCGenerateImageOptions) => {
  // eslint-disable-next-line camelcase
  __webpack_public_path__ = window.KETCHER_STATIC_RESOURCES_URL ?? '';

  return import('./utils/struct-deserializer').then((m) =>
    m.generateImageAsBase64(molFile, options),
  );
};

window.acdKetcher = {
  generateImageAsBase64,
  registerRenderer,
  registerEditor,
  registerPeriodicTable,
};

// For backward compatibility
window.acdKetcherInitializer = {
  registerRenderer,
  registerEditor,
  registerPeriodicTable,
};
