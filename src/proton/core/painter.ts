import { DomObject } from "./dom_object.js";
import { Framework } from "./framework.js";
import { StatefulWidget } from "../../proton.js";
import { ParentKeyProp, Widget } from "./types.js";

type WidgetToRenderProp = ParentKeyProp & {
  widget: Widget;
};

type EventListenerProp = {
  type: "click"; // -> part of [HTMLElementEventMap]
  bind: Object;
  capture: boolean;
  listener: CallableFunction;
};

export class Painter {
  private domObject: DomObject;

  constructor(domObject: DomObject) {
    this.domObject = domObject;

    if (StatefulWidget.name == this.domObject.context.widgetType) {
      this.incrementBuildCount();
    }
  }

  renderText(textContents: string) {
    this.domObject.domNode.innerText = textContents;
  }

  renderHtml(htmlContents: string) {
    this.domObject.domNode.innerHTML = htmlContents;
  }

  insertCssClasses(classes: string[]) {
    if (classes.length > 0) {
      this.domObject.domNode.classList.add(...classes);
    }
  }

  resetStyles() {
    this.domObject.domNode.style.all = "unset";
  }

  attachEventListerner(props: EventListenerProp) {
    this.domObject.domNode.addEventListener(
      props.type,
      (event: MouseEvent) => props.listener.bind(props.bind)(event),
      props.capture,
    );
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
