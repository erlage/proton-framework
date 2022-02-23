import { DomObject } from "./dom_object.js";
import { Framework } from "./framework.js";
import { StatefulWidget } from "../../proton.js";
import { ParentKeyProp, Widget } from "./types.js";

type WidgetToRenderProp = ParentKeyProp & {
  widget: Widget;
};

export class Painter {
  private domObject: DomObject;
  domNode: HTMLElement;

  constructor(domObject: DomObject) {
    this.domObject = domObject;
    this.domNode = this.domObject.domNode;

    if (StatefulWidget.name == this.domObject.context.widgetType) {
      this.incrementBuildCount();
    }
  }

  renderSingleWidget(props: WidgetToRenderProp) {
    Framework.build(
      props.widget.builder({
        parentKey: props.parentKey,
      }),
    );
  }

  incrementBuildCount() {
    let count = 0;
    if (undefined != this.domObject.domNode.dataset.wbc) {
      count = parseInt(this.domObject.domNode.dataset.wbc);
    }

    this.domObject.domNode.dataset.wbc = (count + 1).toString();
  }
}
