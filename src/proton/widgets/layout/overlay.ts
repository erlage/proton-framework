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
import { OverlayEntryWidget } from "./overlay_entry.js";

type OverlayProps = WidgetStyleProps & {
  initialEntries: OverlayEntryWidget[];
};

type WidgetProps = WidgetFoundationProps & OverlayProps;
type RenderObjectProps = WidgetRenderProps & OverlayProps;

export function Overlay(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new OverlayRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: Overlay.name,
        widgetDomTag: DomTag.span,

        class: props.class,
        classes: props.classes,

        initialEntries: props.initialEntries,
      }),
  };
}

class OverlayRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    this.setStyleClass(domNode, this.props);

    new Painter(this.context, domNode).renderMultipleWidgets(this.props.initialEntries);
  }
}
