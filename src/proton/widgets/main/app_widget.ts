import { DomTag } from "../../core/enums.js";
import { Framework } from "../../core/framework.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, BuildContext, ParentKeyProp, Widget, WidgetFoundationProps } from "../../core/types.js";

type AppProps = ParentKeyProp & {
  child: Widget;
};

type WidgetProps = WidgetFoundationProps & AppProps;
type RenderObjectProps = BuildableContext & AppProps;

export abstract class AppWidget implements Widget {
  private props: WidgetProps;

  constructor(props: WidgetProps) {
    this.props = props;

    Framework.init();
    Framework.build(this.builder(this.props));
  }

  builder(_: BuildableContext) {
    let renderObject = new AppWidgetRenderObject({
      key: this.props.key,
      parentKey: this.props.parentKey,

      child: this.props.child,
    });

    renderObject.setChildWidget(this.build(renderObject.context));

    return renderObject;
  }

  build(_: BuildContext) {
    return this.props.child;
  }
}

class AppWidgetRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  setChildWidget(widget: Widget) {
    this.props.child = widget;
  }

  widgetType() {
    return AppWidget.name;
  }

  widgetDomNodeTag() {
    return DomTag.span;
  }

  render(painter: Painter) {
    painter.domNode.style.all = "unset";

    painter.renderSingleWidget({
      parentKey: this.context.key,
      widget: this.props.child!,
    });
  }
}
