import { DomTag, MeasuringUnit } from "./enums.js";
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

export type ChildWidgetProp = {
  child: Widget;
};

// layout

export type SizeProps = {
  width?: number;
  height?: number;
};

export type PositionProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type MeasuringUnitsProps = {
  sizingUnit: MeasuringUnit;
  positioningUnit: MeasuringUnit;
};

export type OptionalSizingUnitProp = {
  sizingUnit?: MeasuringUnit;
};

export type OptionalPositioningUnitProp = {
  positioningUnit?: MeasuringUnit;
};

export type OptionalMeasuringUnitsProps = OptionalSizingUnitProp & OptionalPositioningUnitProp;

// build context

export type BuildContext = KeyProp & ParentKeyProp & WidgetTypeProp & WidgetDomTagProp;

export type BuildableContext = OptionalKeyProp & ParentKeyProp;

// widget

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

export type WidgetFoundationProps = OptionalKeyProp;

export type WidgetRenderProps = BuildableContext & WidgetTypeProp & WidgetDomTagProp;

export type Widget = {
  builder(context: BuildableContext): RenderObject;
};
