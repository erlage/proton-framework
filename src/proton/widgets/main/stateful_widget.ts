import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, BuildContext, Widget, WidgetFoundationProps } from "../../core/types.js";

type RenderObjectProps = BuildableContext & {
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
    //
    // keep state intact during widget rebuilds
    //
    if (undefined == this.renderObject) {
      //
      // lifecycle hook, init state
      //
      this.initState();

      this.renderObject = new StatefulWidgetRenderObject({
        key: this.props?.key,
        parentKey: context.parentKey,

        dispose: () => this.dispose(),
      });
    }

    // always call build to get upto-date interface for building

    this.renderObject.setChildWidget(this.statefulBuild(this.renderObject.context));

    return this.renderObject;
  }

  private statefulBuild(context: BuildContext) {
    return this.build(context);
  }

  initState(): void {}

  abstract build(context: BuildContext): Widget;

  dispose(): void {}

  setState(closure?: CallableFunction) {
    if (this.isRebuilding) {
      throw "setState() called during build.";
    }

    this.isRebuilding = true;

    if (undefined != closure) {
      closure();
    }

    if (undefined == this.renderObject) {
      throw "setState() called while initState() was not completed.";
    }

    // call build method

    this.renderObject.setChildWidget(this.build(this.renderObject.context));

    // rebuild

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

  widgetType() {
    return StatefulWidget.name;
  }

  widgetDomNodeTag() {
    return DomTag.span;
  }

  render(painter: Painter) {
    if (undefined == this.props.child) {
      throw "Render Object must set child before dispatching render call.";
    }

    painter.domNode.style.all = "unset";

    painter.renderSingleWidget({
      parentKey: this.context.key,
      widget: this.props.child,
    });
  }

  beforeDomNodeRemove(): void {
    this.props.dispose();
  }
}
