import { DomTag } from "./enums.js";
import { Framework } from "./framework.js";
import { BuildContext } from "../../proton.js";
import { BuildableContext } from "./types.js";

type RenderObjectProps = BuildableContext;

export abstract class RenderObject {
  context: BuildContext;

  constructor(props: RenderObjectProps) {
    this.context = {
      key: props.key ?? Framework.generateId(),
      parentKey: props.parentKey,
      widgetType: this.widgetType(),
      widgetDomTag: this.widgetDomNodeTag(),
    };
  }

  protected abstract widgetType(): string;

  protected abstract widgetDomNodeTag(): DomTag;

  abstract render(domNode: HTMLElement): void;

  beforeDomNodeMount(): void {}

  afterDomNodeMount(): void {}

  beforeDomNodeRemove(): void {}

  rebuild() {
    Framework.build(this);
  }
}
