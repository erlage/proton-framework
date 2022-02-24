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
      widgetsToRenderProps.push(widgetPropBuilder(this.context.key, child));
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
}
