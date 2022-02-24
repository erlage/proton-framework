import { mapDomTag } from "./enums.js";
import { BuildContext } from "./types.js";

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
    // we can't use node.parentElement here cus root widget's parent can be null

    let parent = document.getElementById(this.context.parentKey);

    if (undefined == parent) {
      throw `Parent doesn't exist: #${this.context.parentKey}`;
    }

    return parent;
  }
}
