import { Framework } from "./framework.js";
import { BuildContext, WidgetRenderProps, WidgetStyleProps } from "./types.js";

export abstract class RenderObject {
  context: BuildContext;

  constructor(props: WidgetRenderProps) {
    this.context = {
      key: props.key ?? Framework.generateId(),
      parentKey: props.parentKey,

      widgetType: props.widgetType,
      widgetDomTag: props.widgetDomTag,
    };
  }

  abstract render(domNode: HTMLElement): void;

  beforeDomNodeMount(): void {}

  afterDomNodeMount(): void {}

  beforeDomNodeRemove(): void {}

  rebuild() {
    Framework.build(this);
  }

  setStyleClass(domNode: HTMLElement, props: WidgetStyleProps) {
    domNode.className = ((props.class ?? "") + " " + (props.classes?.join(" ") ?? "")).trim();
  }
}
