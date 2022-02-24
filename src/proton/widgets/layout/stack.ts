import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import {
  BuildableContext,
  MultipleChildWidgetsProp,
  Widget,
  WidgetFoundationProps,
  WidgetRenderProps,
  WidgetStyleProps,
} from "../../core/types.js";

type StackProps = WidgetStyleProps & MultipleChildWidgetsProp;

type WidgetProps = WidgetFoundationProps & StackProps;
type RenderObjectProps = WidgetRenderProps & StackProps;

export function Stack(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new StackRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        class: props.class,
        classes: props.classes,

        widgetType: Stack.name,
        widgetDomTag: DomTag.div,

        children: props.children,
      }),
  };
}

class StackRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    this.setStyleClass(domNode, this.props);

    new Painter(this.context, domNode).renderMultipleWidgets(this.props.children);
  }
}
