import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import {
  BuildableContext,
  Widget,
  WidgetFoundationProps,
  WidgetRenderProps,
  WidgetStyleProps,
} from "../../core/types.js";

type ContainerProps = {
  child: Widget;
};

type WidgetProps = WidgetFoundationProps & WidgetStyleProps & ContainerProps;
type RenderObjectProps = WidgetRenderProps & WidgetStyleProps & ContainerProps;

export function Container(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new ContainerRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: Container.name,
        widgetDomTag: DomTag.div,

        class: props.class,
        classes: props.classes,

        child: props.child,
      }),
  };
}

class ContainerRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    this.setStyleClass(domNode, this.props);

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }
}
