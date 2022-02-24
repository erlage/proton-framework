import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, BuildContext, Widget, WidgetFoundationProps, WidgetRenderProps } from "../../core/types.js";

type RenderObjectProps = WidgetRenderProps & {
  child?: Widget;
  dispose: CallableFunction;
};

export abstract class StatefulWidget implements Widget {
  private props?: WidgetFoundationProps;
  private renderObject?: StatefulWidgetRenderObject;
  private isRebuilding = false;

  constructor(props?: WidgetFoundationProps) {
    this.props = props;
  }

  builder(context: BuildableContext) {
    if (undefined != this.renderObject) {
      throw "Framework must not call builder() more than once";
    }

    this.initState();

    this.renderObject = new StatefulWidgetRenderObject({
      key: this.props?.key,
      parentKey: context.parentKey,

      widgetType: StatefulWidget.name,
      widgetDomTag: DomTag.span,

      dispose: () => this.dispose(),
    });

    this.renderObject.setChildWidget(this.build(this.renderObject.context));

    return this.renderObject;
  }

  initState(): void {}

  abstract build(context: BuildContext): Widget;

  dispose(): void {}

  setState(closure?: CallableFunction) {
    if (undefined == this.renderObject) {
      throw "setState() called during initState().";
    }
    if (this.isRebuilding) {
      throw "setState() called while widget was building. Usually happens when you call setState() in build()";
    }

    this.isRebuilding = true;

    if (undefined != closure) {
      closure();
    }

    // get new interface

    this.renderObject.setChildWidget(this.build(this.renderObject.context));

    // do rebuild

    this.renderObject.rebuild();

    this.isRebuilding = false;
  }
}

class StatefulWidgetRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  setChildWidget(widget: Widget) {
    this.props.child = widget;
  }

  render(domNode: HTMLElement) {
    if (undefined == this.props.child) {
      throw "Render Object must set child widget to render before dispatching render call.";
    }

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }

  beforeDomNodeRemove(): void {
    this.props.dispose();
  }
}
