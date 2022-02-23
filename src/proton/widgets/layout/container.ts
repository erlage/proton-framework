import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, Widget, WidgetFoundationProps, WidgetStyleProps } from "../../core/types.js";

type ContainerProps = {
  child: Widget;
};

type WidgetProps = WidgetFoundationProps & WidgetStyleProps & ContainerProps;
type RenderObjectProps = BuildableContext & WidgetStyleProps & ContainerProps;

export function Container(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new ContainerRenderObject({
        key: props.key,
        parentKey: context.parentKey,

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

  widgetType() {
    return Container.name;
  }

  widgetDomNodeTag() {
    return DomTag.div;
  }

  render(painter: Painter) {
    if (undefined != this.props.class) {
      painter.insertCssClasses([this.props.class]);
    }

    if (undefined != this.props.classes) {
      painter.insertCssClasses(this.props.classes);
    }

    painter.renderSingleWidget({
      parentKey: this.context.key,
      widget: this.props.child,
    });
  }
}
