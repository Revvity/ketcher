import Resemble from 'resemblejs';
import { RendererWebComponent } from '../renderer-web-component/renderer-web-component';
import { RendererModel } from './renderer.model';

const TESTING_SERVER_URL = 'http://localhost:6789';

export function createComponent(width?: string, height?: string): RendererWebComponent {
  const el = document.createElement('acd-ketcher-renderer') as RendererWebComponent;
  el.style.display = 'grid';
  el.style.alignItems = 'center';
  el.style.height = height ?? '1000px';
  el.style.width = width ?? '1000px';
  document.body.appendChild(el);

  return el;
}

export async function renderStructure(
  element: RendererWebComponent,
  model: RendererModel,
): Promise<void> {
  for (const key in model) {
    element[key] = model[key];
  }

  return element.update();
}

function svgToPng(svg: string): Promise<string> {
  const useLocal = true;

  return useLocal ? svgToPngLocal(svg) : svgToPngExternal(svg);
}

function svgToPngExternal(svg: string): Promise<string> {
  return fetch(`${TESTING_SERVER_URL}/svgToPng`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ svg }),
  })
    .then((res) => {
      if (res.ok) {
        return res.blob();
      }

      throw new Error(res.statusText);
    })
    .then((blob) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result as string);
      });
    });
}

function svgToPngLocal(svg: string): Promise<string> {
  const finalizeFns = new Array<() => void>();

  return new Promise<string>((resolve, reject) => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const uri = URL.createObjectURL(blob);
    finalizeFns.push(() => URL.revokeObjectURL(uri));

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      finalizeFns.push(() => canvas.remove());

      canvas.style.width = `${image.width}px`;
      canvas.style.height = `${image.height}px`;
      canvas.width = image.width * devicePixelRatio;
      canvas.height = image.height * devicePixelRatio;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Unable to acquire rendering context'));
        return;
      }
      context.drawImage(
        image,
        0,
        0,
        image.width * devicePixelRatio,
        image.height * devicePixelRatio,
      );
      const png = canvas.toDataURL('image/png');
      resolve(png);
    };

    document.body.appendChild(image);
    finalizeFns.push(() => image.remove());

    image.src = uri;
  }).finally(() => finalizeFns.forEach((fn) => fn()));
}

export function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function dispatchMouseEvent(
  element: HTMLElement,
  eventType: string,
  clientX: number,
  clientY: number,
) {
  const event = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX,
    clientY,
  });

  element.dispatchEvent(event);
}

export interface SvgComparisonResult {
  readonly misMatchPercentage: number;
  readonly actualPng: string;
  readonly expectedPng: string;
  createResultElement(): Element;
  saveToFile(fileName: string): Promise<void>;
}

export async function compareSvg(actual: string, expected: string): Promise<SvgComparisonResult> {
  const actualPng = await svgToPng(actual);
  const expectedPng = await svgToPng(expected);

  return new Promise<SvgComparisonResult>((resolve) => {
    Resemble(actualPng)
      .compareTo(expectedPng)
      .ignoreAntialiasing()
      .onComplete((result) => {
        resolve({
          misMatchPercentage: +result.misMatchPercentage,
          actualPng,
          expectedPng,
          createResultElement: () => {
            const el = document.createElement('div');
            el.innerHTML = `<h1>Actual</h1>
            <img src="${actualPng}" />
            <h2>Expected</h2>
            <img src="${expectedPng}" />
            <h2>Diff ${result.misMatchPercentage}</h2>
            <img src="${result.getImageDataUrl()}" />`;

            return el;
          },
          saveToFile: (fileName: string) => {
            const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
</head>
<body>
  <h1>Actual SVG</h1>
  ${actual}
  <h1>Expected SVG</h1>
  ${expected}
  <h1>Actual</h1>
  <img src="${actualPng}" />
  <h2>Expected</h2>
  <img src="${expectedPng}" />
  <h2>Diff ${result.misMatchPercentage}</h2>
  <img src="${result.getImageDataUrl()}" />
</body>
</html>`;

            return saveToFile({ fileName: fileName + '.html', content }).then(() =>
              saveToFile({ fileName: fileName + '.svg', content: actual }),
            );
          },
        });
      });
  });
}

export async function saveToFile(args: { fileName: string; content: string }): Promise<void> {
  const fileName = encodeURIComponent(args.fileName);
  await fetch(`${TESTING_SERVER_URL}/saveToFile?fileName=${fileName}`, {
    method: 'POST',
    body: args.content,
  });
}

export function getSvg(element: RendererWebComponent): string {
  const svg = element.querySelector('svg');
  if (!svg) {
    throw new Error('Unable to find svg element');
  }

  return new XMLSerializer().serializeToString(svg);
}
