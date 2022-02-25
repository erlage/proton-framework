import { DomTag } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import {
  BuildableContext,
  SingleChildWidgetProp,
  WidgetFoundationProps,
  WidgetRenderProps,
  WidgetStyleProps,
} from "../../core/types.js";

type OverlayEntryProps = WidgetStyleProps &
  SingleChildWidgetProp & {
    opaque?: boolean;
  };

type WidgetProps = WidgetFoundationProps & OverlayEntryProps;
type RenderObjectProps = WidgetRenderProps & OverlayEntryProps;

export type OverlayEntryWidget = {
  builder(context: BuildableContext): OverlayEntryRenderObject;
};

export function OverlayEntry(props: WidgetProps): OverlayEntryWidget {
  return {
    builder: (context: BuildableContext) =>
      new OverlayEntryRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: OverlayEntry.name,
        widgetDomTag: DomTag.span,

        class: props.class,
        classes: props.classes,

        opaque: props.opaque,

        child: props.child,
      }),
  };
}

class OverlayEntryRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    if (undefined == this.props.opaque || this.props.opaque) {
      if (undefined == this.props.classes) {
        this.props.classes = [];
      }

      this.props.classes.push("p-opaque");
    }

    this.setStyleClass(domNode, this.props);

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }
}
