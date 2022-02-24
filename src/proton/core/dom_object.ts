import { DomTag } from "./enums.js";
import { BuildContext } from "./types.js";

function mapDomTag(tag: DomTag) {
  switch (tag) {
    case DomTag.div:
      return "div";
    default:
      return "span";
  }
}

export class DomObject {
  context: BuildContext;

  domNode: HTMLElement;

  constructor(props: BuildContext) {
    this.context = props;

    this.domNode = document.createElement(mapDomTag(this.context.widgetDomTag));

    this.domNode.id = this.context.key;
    this.domNode.dataset.wtype = this.context.widgetType;
  }

  mount() {
    this.parent().append(this.domNode);
  }

  parent() {
    let parent = document.getElementById(this.context.parentKey);

    if (undefined == parent) {
      throw `Parent doesn't exist: #${this.context.parentKey}`;
    }

    return parent;
  }
}
