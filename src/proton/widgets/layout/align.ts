import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, Widget, WidgetFoundationProps, WidgetRenderProps } from "../../core/types.js";

export enum Alignment {
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}

type AlignProps = {
  alignment: Alignment;
  child: Widget;
};

type WidgetProps = WidgetFoundationProps & AlignProps;
type RenderObjectProps = WidgetRenderProps & AlignProps;

export function Align(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new AlignRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: Align.name,
        widgetDomTag: DomTag.span,

        alignment: props.alignment,
        child: props.child,
      }),
  };
}

class AlignRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    switch (this.props.alignment) {
      case Alignment.topRight:
        domNode.classList.add("p-align-top-right");
        break;

      case Alignment.bottomRight:
        domNode.classList.add("p-align-bottom-right");
        break;

      case Alignment.bottomLeft:
        domNode.classList.add("p-align-bottom-left");
        break;

      default:
        domNode.classList.add("p-align-top-left");
        break;
    }

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }
}
