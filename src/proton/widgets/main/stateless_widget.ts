import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, BuildContext, Widget, WidgetFoundationProps } from "../../core/types.js";

type RenderObjectProps = BuildableContext & {
  child?: Widget;
};

export abstract class StatelessWidget implements Widget {
  private props?: WidgetFoundationProps;

  constructor(props?: WidgetFoundationProps) {
    this.props = props;
  }

  builder(context: BuildableContext) {
    let renderObject = new StatelessWidgetRenderObject({
      key: this.props?.key,
      parentKey: context.parentKey,
    });

    renderObject.setChildWidget(this.build(renderObject.context));

    return renderObject;
  }

  abstract build(context: BuildContext): Widget;
}

class StatelessWidgetRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  setChildWidget(widget: Widget) {
    this.props.child = widget;
  }

  widgetType() {
    return StatelessWidget.name;
  }

  widgetDomNodeTag() {
    return DomTag.span;
  }

  render(painter: Painter) {
    if (undefined == this.props.child) {
      throw "Render Object must set child before dispatching render call.";
    }

    painter.domNode.style.all = "unset";

    painter.renderSingleWidget(this.props.child);
  }
}
