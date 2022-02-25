import { Constants } from "../../core/constants.js";
import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, BuildContext, Widget, WidgetFoundationProps, WidgetRenderProps } from "../../core/types.js";

type RenderObjectProps = WidgetRenderProps & {
  child?: Widget;
  dispose: CallableFunction;
};

export abstract class StatefulWidget implements Widget {
  context: BuildContext;

  private props?: WidgetFoundationProps;
  private renderObject?: StatefulWidgetRenderObject;
  private isRebuilding = false;

  constructor(props?: WidgetFoundationProps) {
    this.props = props;

    /**
     * goal here is to somehow expose context to subclasses i.e user's
     * widgets that extends statefulwidget. easiest way would be to
     * directly expose context by making it public.
     *
     * it has one problem thou, since context is only built when builder() is
     * called what if user tries to use context in their widget's constructor?
     *
     * two solutions(that I can think of) to this problem are:
     *
     * 1. making context optional i.e context? but this means inorder to use
     * context user has to use pesky ! operator every single time.
     *
     * 2. second solution would be to have a dummy context and warn user
     * if they tries to use it before actual context is ready. for now, I'm
     * doing this
     *  - create dummy context
     *  - guard internal methods against dummy context so they must throw
     *    exception if user tries to use context while it's in its dummy state
     *
     * note that, context will be available at the point of initState and in all other
     * methods. problem occurs only when user tries to use context in the contructor.
     *
     * below we're creating a dummy context
     */

    this.context = {
      key: Constants.inBuildPhase,
      parentKey: Constants.inBuildPhase,
      widgetType: StatefulWidget.name,
      widgetDomTag: DomTag.span,
    };
  }

  builder(context: BuildableContext) {
    if (undefined != this.renderObject) {
      throw "Framework must not call builder() more than once";
    }

    this.renderObject = new StatefulWidgetRenderObject({
      key: this.props?.key,
      parentKey: context.parentKey,

      widgetType: StatefulWidget.name,
      widgetDomTag: DomTag.span,

      dispose: () => this.dispose(),
    });

    this.context = this.renderObject.context;

    this.initState();

    this.renderObject.setChildWidget(this.build(this.renderObject.context));

    return this.renderObject;
  }

  initState(): void {}

  abstract build(context: BuildContext): Widget;

  dispose(): void {}

  setState(closure?: CallableFunction) {
    if (undefined == this.renderObject) {
      throw "setState() called before state init.";
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
