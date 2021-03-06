import { DomObject } from "../../core/dom_object.js";
import { DomTag } from "../../core/enums.js";
import { Framework } from "../../core/framework.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import {
  BuildableContext,
  BuildContext,
  Widget,
  WidgetFoundationProps,
  WidgetStateObjects,
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

// lookup methods

Overlay.of = function (context: BuildContext): OverlayManager | null {
  let widgetObject = Framework.findAncestorOfType(Overlay.name, context);

  if (null == widgetObject) {
    return null;
  }

  return new OverlayManager(widgetObject);
};

class OverlayManager {
  private renderObject: RenderObject;
  private domObject: DomObject;
  private painter: Painter;

  constructor(widgetObject: WidgetStateObjects) {
    this.renderObject = widgetObject.renderObject;
    this.domObject = widgetObject.domObject;

    this.painter = new Painter(this.renderObject.context, this.domObject.domNode);
  }

  insert(entry: OverlayEntryWidget) {
    this.painter.renderSingleWidget(entry, true);
  }

  insertAll(entries: OverlayEntryWidget[]) {
    this.painter.renderMultipleWidgets(entries, true);
  }
}
