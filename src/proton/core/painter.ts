import { Framework } from "./framework.js";
import { BuildContext, ParentKeyProp, Widget } from "./types.js";

export class Painter {
  context: BuildContext;
  domNode: HTMLElement;

  constructor(context: BuildContext, domNode: HTMLElement) {
    this.context = context;
    this.domNode = domNode;
  }

  renderSingleWidget(widget: Widget) {
    Framework.build(
      widget.builder({
        parentKey: this.context.key,
      }),
    );
  }

  renderMultipleWidgets(widgets: Widget[]) {
    let isSibling = false;

    for (let child of widgets) {
      Framework.build(
        child.builder({
          parentKey: this.context.key,
        }),
        isSibling,
      );

      isSibling = true;
    }
  }
}
