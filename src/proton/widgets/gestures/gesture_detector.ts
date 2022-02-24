import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, Widget, WidgetDomTagProp, WidgetFoundationProps, WidgetTypeProp } from "../../core/types.js";

export enum HitTestBehaviour {
  /**
   * child gesture detectors will receive events and won't let them propagate to parents
   */
  deferToChild,

  /**
   * receive events and prevent child gesture detectors from receiving events
   */
  opaque,

  /**
   * all of the detectors that are hit will receive events
   */
  translucent,
}

type GestureDetectorProps = {
  child: Widget;
  onTap?: CallableFunction;
  behaviour?: HitTestBehaviour;
};

type WidgetProps = WidgetFoundationProps & GestureDetectorProps;
type RenderObjectProps = BuildableContext & WidgetTypeProp & WidgetDomTagProp & GestureDetectorProps;

export function GestureDetector(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new GestureDetectorObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: GestureDetector.name,
        widgetDomTag: DomTag.span,

        onTap: props.onTap,
        child: props.child,
        behaviour: props.behaviour,
      }),
  };
}

class GestureDetectorObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    domNode.addEventListener(
      "click",
      (event: MouseEvent) => this.handleOnTap(event),
      this.props.behaviour == HitTestBehaviour.opaque,
    );

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }

  handleOnTap(event: MouseEvent) {
    event.preventDefault();

    if (undefined == this.props.onTap) {
      return;
    }

    switch (this.props.behaviour) {
      case HitTestBehaviour.opaque:
      case HitTestBehaviour.deferToChild:
        event.stopPropagation();

        break;

      case HitTestBehaviour.translucent:
        break;
    }

    this.props.onTap();
  }
}
