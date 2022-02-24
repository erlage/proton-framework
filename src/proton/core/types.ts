import { DomTag } from "./enums.js";
import { RenderObject } from "./render_object.js";

export type KeyProp = {
  key: string;
};

export type OptionalKeyProp = {
  key?: string;
};

export type ParentKeyProp = {
  parentKey: string;
};

export type OptionalParentKeyProp = {
  parentKey?: string;
};

export type WidgetTypeProp = {
  widgetType: string;
};

export type WidgetDomTagProp = {
  widgetDomTag: DomTag;
};
export type WidgetStyleProps = {
  class?: string;
  classes?: string[];
};

export type BuildContext = KeyProp & ParentKeyProp & WidgetTypeProp & WidgetDomTagProp;

export type BuildableContext = OptionalKeyProp & ParentKeyProp;

export type WidgetFoundationProps = OptionalKeyProp;

export type WidgetRenderProps = BuildableContext & WidgetTypeProp & WidgetDomTagProp;

export type Widget = {
  builder(context: BuildableContext): RenderObject;
};
