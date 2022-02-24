import { DomTag } from "../../core/enums.js";
import { Framework } from "../../core/framework.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { Widget, BuildContext, ParentKeyProp, BuildableContext, WidgetFoundationProps } from "../../core/types.js";

import "../../styles/include/normalize.css";
import "../../styles/main.css";

type AppProps = ParentKeyProp & {
  widgetType: string;
  widgetDomTag: DomTag;
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

      widgetType: this.props.widgetType,
      widgetDomTag: this.props.widgetDomTag,

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
    return this.props.widgetType;
  }

  widgetDomNodeTag() {
    return;
  }

  render(domNode: HTMLElement) {
    if (null == domNode.parentElement) {
      throw "Unable to locate target element in dom";
    }

    domNode.parentElement.dataset.wtype = "Target";

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }
}
