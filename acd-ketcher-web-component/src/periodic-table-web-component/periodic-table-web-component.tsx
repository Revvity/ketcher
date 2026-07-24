/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { ElementsTable as ElementsTableOriginal, AtomInfo } from 'ketcher-react';
import React, { useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { Elements, Element } from 'ketcher-core';
import '../editor-styles.scss';

const ElementsTable = ElementsTableOriginal as any;

const PeriodicTableComponent = (props: { onAtomSelected?: (label: string) => void }) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [currentElement, setCurrentElement] = useState<Element | undefined>(Elements.get(2));
  const [isInfo, setIsInfo] = useState(false);

  const selected = (label: string): boolean => {
    return selectedLabel === label;
  };

  const currentEvents = (element: Element) => {
    return {
      onMouseEnter: () => {
        setCurrentElement(element);
        setIsInfo(true);
      },
      onMouseLeave: () => {
        setIsInfo(false);
      },
    };
  };

  const onAtomSelect = (label: string) => {
    setSelectedLabel(label);

    props.onAtomSelected?.(label);
  };

  return (
    <div className="acd-periodic-table-wrapper">
      <AtomInfo el={currentElement} isInfo={isInfo} />

      <ElementsTable
        value={selectedLabel}
        currentEvents={currentEvents}
        selected={selected}
        onAtomSelect={(label: string) => onAtomSelect(label)}
        onDoubleClick={() => {}}
      />
    </div>
  );
};

class PeriodicTableWebComponent extends HTMLElement {
  private root?: Root;

  private readonly props = {
    onAtomSelected: (label: string) =>
      this.dispatchEvent(new CustomEvent('atom-selected', { detail: { label } })),
  };

  public connectedCallback(): void {
    __webpack_public_path__ = window.KETCHER_STATIC_RESOURCES_URL ?? '';

    this.root = createRoot(this);
    this.root.render(<PeriodicTableComponent {...this.props} />);
  }

  public disconnectedCallback(): void {
    this.root?.unmount();
    this.root = undefined;
  }
}

export function registerPeriodicTable(): void {
  customElements.define('acd-ketcher-periodic-table', PeriodicTableWebComponent);
}
