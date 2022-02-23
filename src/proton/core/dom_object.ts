import { DomTag } from "./enums.js";
import { BuildContext } from "./types.js";

const tagMap = new Map<DomTag, string>([
  [DomTag.div, "div"],
  [DomTag.span, "span"],
]);

export class DomObject {
  context: BuildContext;

  domNode: HTMLElement;

  constructor(props: BuildContext) {
    this.context = props;

    this.domNode = document.createElement(tagMap.get(this.context.widgetDomTag)!);

    this.domNode.id = this.context.key;
    this.domNode.dataset.wtype = this.context.widgetType;
  }

  mount() {
    this.parent()?.append(this.domNode!);
  }

  parent() {
    return document.getElementById(this.context.parentKey);
  }
}
