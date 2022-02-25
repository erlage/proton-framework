import { Framework } from "./framework.js";
import { BuildContext, Widget } from "./types.js";

export class Painter {
  context: BuildContext;
  domNode: HTMLElement;

  constructor(context: BuildContext, domNode: HTMLElement) {
    this.context = context;
    this.domNode = domNode;
  }

  renderSingleWidget(widget: Widget, append = false) {
    Framework.build(
      widget.builder({
        parentKey: this.context.key,
      }),
      append,
    );
  }

  renderMultipleWidgets(widgets: Widget[], append = false) {
    for (let child of widgets) {
      Framework.build(
        child.builder({
          parentKey: this.context.key,
        }),
        append,
      );

      // we must append remaining widgets
      append = true;
    }
  }
}
