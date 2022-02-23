import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import { BuildableContext, Widget, WidgetFoundationProps, WidgetStyleProps } from "../../core/types.js";

type TextProps = {
  text: string;
  isHtml?: boolean;
};

type WidgetProps = WidgetFoundationProps & WidgetStyleProps & TextProps;
type RenderObjectProps = BuildableContext & WidgetStyleProps & TextProps;

export function Text(props: string | WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new TextRenderObject({
        key: typeof props === "string" ? undefined : props.key!,
        parentKey: context.parentKey,

        class: typeof props === "string" ? undefined : props.class,
        classes: typeof props === "string" ? undefined : props.classes,

        text: typeof props === "string" ? props : props.text,
        isHtml: typeof props === "string" ? false : props.isHtml,
      }),
  };
}

class TextRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  widgetType() {
    return Text.name;
  }

  widgetDomNodeTag() {
    return DomTag.span;
  }

  render(painter: Painter) {
    painter.domNode.className = (this.props.class ?? "") + " " + this.props.classes?.join(" ");

    if (undefined !== this.props.isHtml && this.props.isHtml) {
      painter.domNode.innerHTML = this.props.text;

      return;
    }

    painter.domNode.innerText = this.props.text;
  }
}
