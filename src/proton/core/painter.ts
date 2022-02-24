import { DomObject } from "./dom_object.js";
import { Framework } from "./framework.js";
import { StatefulWidget } from "../../proton.js";
import { ParentKeyProp, Widget } from "./types.js";

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

  renderSingleWidget(widget: Widget) {
    Framework.build(
      widget.builder({
        parentKey: this.domObject.context.key,
      }),
    );
  }

  renderMultipleWidgets(widgets: Widget[]) {
    type WidgetRenderProps = ParentKeyProp & {
      widget: Widget;
    };

    let widgetsToRenderProps: WidgetRenderProps[] = [];

    let widgetPropBuilder = function (key: string, builder: Widget) {
      return {
        parentKey: key,
        widget: builder,
      };
    };

    for (let child of widgets) {
      widgetsToRenderProps.push(widgetPropBuilder(this.domObject.context.key, child));
    }

    // i know we can do above process in one map
    // but rn goal is to keep it clean and readable

    Framework.build(
      widgetsToRenderProps.map((props) =>
        props.widget.builder({
          parentKey: props.parentKey,
        }),
      ),
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
