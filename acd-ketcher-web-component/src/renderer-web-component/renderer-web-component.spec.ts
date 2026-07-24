/* eslint-disable no-loop-func */
import * as catechin from '../tests/examples/catechin';
import * as markush from '../tests/examples/markush-loss';
import * as dative from '../tests/examples/dative';
import * as catechinWithoutLabels from '../tests/examples/catechin-without-labels';
import * as catechinAssigned from '../tests/examples/catechin-assigned';
import * as catechinAssignedHighlighted from '../tests/examples/catechin-assigned-highlighted';
import * as aspartamePrePreview from '../tests/examples/aspartame-hmbc-prepreview';
import * as rAliased from '../tests/examples/r-aliased';
import * as strycnineAssigned from '../tests/examples/strycnine-assigned-short-arrow';
import * as molV3000 from '../tests/examples/v3000-stereo';
import * as molV3000AcdExtensions from '../tests/examples/molv3000-acd-extensions';

import { TestCaseData } from '../tests/renderer.model';
import {
  compareSvg,
  createComponent,
  dispatchMouseEvent,
  getSvg,
  renderStructure,
  timeout,
} from '../tests/utils';
import { RendererWebComponent } from './renderer-web-component';

const rendererTestModels: TestCaseData[] = [
  catechin.testData,
  catechinWithoutLabels.testData,
  catechinAssigned.testData,
  catechinAssignedHighlighted.testData,
  aspartamePrePreview.testData,
  rAliased.testData,
  strycnineAssigned.testData,
  molV3000AcdExtensions.testData,
];

const COMPARISON_THRESHOLD = 0; /* % */

describe('KetcherRendererWebComponent', () => {
  let element: RendererWebComponent;

  beforeEach(async () => {
    window.acdKetcherInitializer = {
      registerEditor: () => {
        return Promise.resolve();
      },
      registerRenderer: () => {
        return Promise.resolve();
      },
      registerPeriodicTable: () => {
        return Promise.resolve();
      },
    };
  });

  afterEach(async () => {
    element?.remove();
  });

  it('should create', () => {
    element = createComponent();

    expect(element).toBeInstanceOf(RendererWebComponent);
  });

  for (const data of rendererTestModels) {
    it(`should render ${data.name}`, async () => {
      element = createComponent();
      await renderStructure(element, data.model);
      const result = await compareSvg(getSvg(element), data.svg);
      // result.saveToFile(data.name);
      expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
    });
  }

  it('should highlight arrow', async () => {
    element = createComponent();
    await renderStructure(element, catechinAssigned.testData.model);
    element.highlightArrow('corrArrow_0');
    await timeout(500);
    const result = await compareSvg(getSvg(element), catechinAssigned.svgWithHlArrow);
    // await result.saveToFile('catechin-assigned-hl-arrow');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should not leak markers', async () => {
    element = createComponent();
    await renderStructure(element, catechinAssigned.testData.model);
    await timeout(500);
    const markersCount = element.querySelectorAll('marker').length;
    expect(markersCount).toBeGreaterThan(0);

    await renderStructure(element, { ...catechinAssigned.testData.model, corrArrowsInfo: [] });
    await timeout(500);
    const emptyMarkersCount = element.querySelectorAll('marker').length;
    expect(emptyMarkersCount).toBe(0);

    await renderStructure(element, catechinAssigned.testData.model);
    await timeout(500);
    const newMarkersCount = element.querySelectorAll('marker').length;
    expect(markersCount).toBe(newMarkersCount);
  });

  it('should render stably', async () => {
    element = createComponent();
    await renderStructure(element, catechinAssigned.testData.model);
    const expectedSvg = getSvg(element);
    await renderStructure(element, { molFile: catechinAssigned.testData.model.molFile });
    await renderStructure(element, catechinAssigned.testData.model);
    const result = await compareSvg(getSvg(element), expectedSvg);
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should render async stably', async () => {
    element = createComponent();
    await renderStructure(element, molV3000.testData.model);
    const expectedSvg = getSvg(element);
    await renderStructure(element, { molFile: molV3000.testData2.model.molFile });
    await renderStructure(element, molV3000.testData.model);

    const svg = getSvg(element);
    const result = await compareSvg(svg, expectedSvg);
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should render stably if initial size is zero', async () => {
    element = createComponent();
    element.style.width = '0px';
    element.style.height = '0px';
    element.sizeChanged();
    await element.update();
    await renderStructure(element, catechinAssigned.testData.model);
    element.style.width = '1000px';
    element.style.height = '1000px';
    element.sizeChanged();
    await element.update();
    const result = await compareSvg(getSvg(element), catechinAssigned.testData.svg);
    // await result.saveToFile('catechin-assigned');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should fit to structure', async () => {
    element = createComponent();
    await renderStructure(element, catechinAssigned.testData.model);
    await element.fitToStructure();
    const result = await compareSvg(getSvg(element), catechinAssigned.svgWithFitToStructure);
    // await result.saveToFile('catechinAssigned-fitToStructure');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should apply merging Atoms Filling and clear if Atoms Decorations are empty', async () => {
    element = createComponent();
    element.mergeAtomsFilling = true;
    await renderStructure(element, catechinAssigned.testData.model);
    let result = await compareSvg(getSvg(element), catechinAssigned.svgWithMergedFilling);
    // await result.saveToFile('catechin-mergedFilling');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
    element.atomsDecorations = {};
    await element.update();
    result = await compareSvg(getSvg(element), catechin.testData.svg);
    // await result.saveToFile('catechin');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should colorize spheres', async () => {
    element = createComponent();
    element.mergeAtomsFilling = true;
    element.spheres = [{ centerAtomIndex: 21, radius: 4, startFromSkelAtom: false, color: '#afe' }];
    await renderStructure(element, { molFile: catechin.testData.model.molFile });
    let result = await compareSvg(getSvg(element), catechin.catechinWithOneSphere);
    // await result.saveToFile('catechin-with-one-sphere');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);

    element.spheres = [
      { centerAtomIndex: 21, radius: 4, startFromSkelAtom: false, color: '#afe' },
      { centerAtomIndex: 22, radius: 4, startFromSkelAtom: false, color: '#F8E' },
    ];

    await renderStructure(element, {});
    result = await compareSvg(getSvg(element), catechin.catechinWithTwoSpheres);
    // await result.saveToFile('catechin-with-two-spheres');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should use fontLabelRatio field', async () => {
    element = createComponent();
    element.fontLabelRatio = 1.5;
    await renderStructure(element, catechinAssigned.testData.model);
    const result = await compareSvg(getSvg(element), catechin.catechinWithFontLabelRatio);
    // await result.saveToFile('catechin-font-label-ratio.svg');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should use fixStructureMinSize field', async () => {
    element = createComponent('300px', '200px');
    element.fixStructureMinSize = true;
    element.fixStructureMinFont = 10;
    await renderStructure(element, catechinAssigned.testData.model);
    const result = await compareSvg(getSvg(element), catechin.catechinWithFixedMinSize);
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
    // await result.saveToFile('catechin-fixed-min-size');
    expect(element.style.minWidth).toBe('412.843px');
    expect(element.style.minHeight).toBe('268.727px');
  });

  it('should colorize spheres', async () => {
    element = createComponent();
    element.mergeAtomsFilling = true;
    element.spheres = [{ centerAtomIndex: 1, radius: 1, color: '#afe', startFromSkelAtom: false }];
    await renderStructure(element, { molFile: catechin.testData.model.molFile });
    let result = await compareSvg(getSvg(element), catechin.catechinWithOneSphereOnHydrogen);
    // await result.saveToFile('catechin-with-one-sphere-on-hydrogen');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);

    element.spheres = [{ centerAtomIndex: 1, radius: 1, color: '#afe', startFromSkelAtom: true }];

    await renderStructure(element, {});
    result = await compareSvg(getSvg(element), catechin.catechinWithOneSphereOnSkel);
    // await result.saveToFile('catechin-with-one-sphere-on-skel');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should show markush', async () => {
    element = createComponent();
    await renderStructure(element, markush.testData.model);
    const result = await compareSvg(getSvg(element), markush.testData.svg);
    // await result.saveToFile('markush-loss');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should highlight markush', async () => {
    element = createComponent();
    await renderStructure(element, markush.testData.model);
    const atomPos = element.getCenterAtomByIndex(29);
    const svgBounds = element.querySelector('svg')?.getBoundingClientRect();
    if (svgBounds && atomPos) {
      dispatchMouseEvent(
        element,
        'mousemove',
        atomPos.x + svgBounds.left,
        atomPos.y + svgBounds.top,
      );
    }
    const result = await compareSvg(getSvg(element), markush.svgHighlightedAtoms);
    // await result.saveToFile('markush-loss-highligted');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should show short dative bonds', async () => {
    element = createComponent();
    await renderStructure(element, dative.testData.model);
    const result = await compareSvg(getSvg(element), dative.testData.svg);
    // await result.saveToFile('dative-short');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should highlight center atom', async () => {
    element = createComponent();
    element.mergeAtomsFilling = true;
    element.spheres = [
      {
        centerAtomIndex: 1,
        startFromSkelAtom: false,
        radius: 1,
        color: '#ffe4c9',
        centerAtomColor: '#FF0000',
      },
    ];
    await renderStructure(element, { molFile: catechin.testData.model.molFile });

    let result = await compareSvg(getSvg(element), catechin.catechinWithOneSphereOnHydrogenHL);
    // await result.saveToFile('catechin-with-one-sphere-on-hydrogen-hl');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);

    element.spheres = [
      {
        centerAtomIndex: 1,
        startFromSkelAtom: true,
        radius: 1,
        color: '#ffe4c9',
        centerAtomColor: '#FF0000',
      },
    ];

    await renderStructure(element, {});
    result = await compareSvg(getSvg(element), catechin.catechinWithOneSphereOnSkelHL);
    // await result.saveToFile('catechin-with-one-sphere-on-skel-hl');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should highlight center atom when radius equal to zero', async () => {
    element = createComponent();
    element.mergeAtomsFilling = true;
    element.spheres = [
      {
        centerAtomIndex: 1,
        startFromSkelAtom: false,
        radius: 0,
        color: '#ffe4c9',
        centerAtomColor: '#FF0000',
      },
    ];
    await renderStructure(element, { molFile: catechin.testData.model.molFile });

    const result = await compareSvg(getSvg(element), catechin.catechinWithZeroSphereOnHydrogenHL);
    // await result.saveToFile('catechin-with-zero-sphere-on-hydrogen-hl');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });

  it('should highlight skel center atom when radius equal to zero', async () => {
    element = createComponent();
    element.mergeAtomsFilling = true;
    element.spheres = [
      {
        centerAtomIndex: 1,
        startFromSkelAtom: true,
        radius: 0,
        color: '#ffe4c9',
        centerAtomColor: '#FF0000',
      },
    ];
    await renderStructure(element, { molFile: catechin.testData.model.molFile });

    const result = await compareSvg(getSvg(element), catechin.catechinWithZeroSphereOnSkelHL);
    // await result.saveToFile('catechin-with-zero-sphere-on-skel-hl');
    expect(result.misMatchPercentage).toBeLessThanOrEqual(COMPARISON_THRESHOLD);
  });
});
