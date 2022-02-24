import { DomTag } from "../../core/enums.js";
import { RenderObject } from "../../core/render_object.js";
import {
  BuildableContext,
  Widget,
  WidgetFoundationProps,
  WidgetRenderProps,
  WidgetStyleProps,
} from "../../core/types.js";

type TextProps = {
  text: string;
  isHtml?: boolean;
};

type WidgetProps = WidgetFoundationProps & WidgetStyleProps & TextProps;
type RenderObjectProps = WidgetRenderProps & WidgetStyleProps & TextProps;

export function Text(props: string | WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new TextRenderObject({
        key: typeof props === "string" ? undefined : props.key,
        parentKey: context.parentKey,

        widgetType: Text.name,
        widgetDomTag: DomTag.span,

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

  render(domNode: HTMLElement) {
    this.setStyleClass(domNode, this.props);

    if (undefined !== this.props.isHtml && this.props.isHtml) {
      domNode.innerHTML = this.props.text;

      return;
    }

    domNode.innerText = this.props.text;
  }
}
