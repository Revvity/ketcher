const ID_SUFFIX = '--ketcher-';
let uniqueIdCounter = 1;

function svgStringToSvgDoc(str: string): Document {
  return new DOMParser().parseFromString(str, 'image/svg+xml');
}

export function svgElemToSvgString(element: SVGSVGElement): string {
  return new XMLSerializer().serializeToString(element);
}

export function buildSvgElement(svg: string): SVGSVGElement | null {
  let doc: Document;
  try {
    doc = svgStringToSvgDoc(svg);
  } catch {
    return null;
  }
  if (doc.getElementsByTagName('parsererror').length) {
    return null;
  }

  if (!(doc.documentElement instanceof SVGSVGElement)) {
    return null;
  }

  return document.adoptNode(doc.documentElement);
}
export function makeIdsUnique(element: SVGSVGElement): SVGSVGElement {
  const idSuffix = ID_SUFFIX + uniqueIdCounter++;
  const idElements = element.querySelectorAll('[id]');

  if (idElements.length === 0) return element;

  const existingIds = new Set<string>();

  for (let i = 0; i < idElements.length; i++) {
    existingIds.add(idElements[i].id);
  }

  const descendants = element.getElementsByTagName('*');

  // Process element first (index -1), then all descendants
  for (let i = -1; i < descendants.length; i++) {
    const elem = i === -1 ? element : descendants[i];

    // Replace internal #id references in href and xlink:href
    for (const refAttr of ['xlink:href', 'href']) {
      const attr = elem.getAttribute(refAttr);
      if (attr && /^\s*#/.test(attr)) {
        elem.setAttribute(refAttr, attr.trim() + idSuffix);
      }
    }
  }

  // Suffix all element IDs
  for (let i = 0; i < idElements.length; i++) {
    idElements[i].id += idSuffix;
  }

  return element;
}
