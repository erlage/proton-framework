import { DomTag, MeasuringUnit, mapMeasuringUnit } from "../../core/enums.js";
import { Painter } from "../../core/painter.js";
import { RenderObject } from "../../core/render_object.js";
import {
  BuildableContext,
  ChildWidgetProp,
  MeasuringUnitsProps,
  OptionalMeasuringUnitsProps,
  OptionalPositioningUnitProp,
  PositionProps,
  SizeProps,
  Widget,
  WidgetFoundationProps,
  WidgetRenderProps,
} from "../../core/types.js";

// prepare props

type PositionedProps = SizeProps & PositionProps & OptionalMeasuringUnitsProps & ChildWidgetProp;
type PositionedFilledProps = PositionProps & OptionalPositioningUnitProp & ChildWidgetProp;

// user exposed

type WidgetProps = WidgetFoundationProps & PositionedProps;
type FilledWidgetProps = WidgetFoundationProps & PositionedFilledProps;

// internal, for render object

type RenderObjectProps = WidgetRenderProps & SizeProps & PositionProps & MeasuringUnitsProps & ChildWidgetProp;

export function Positioned(props: WidgetProps): Widget {
  return {
    builder: (context: BuildableContext) =>
      new PositionedRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: Positioned.name,
        widgetDomTag: DomTag.span,

        sizingUnit: props.sizingUnit ?? MeasuringUnit.pixel,
        width: props.width,
        height: props.height,

        positioningUnit: props.positioningUnit ?? MeasuringUnit.pixel,
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right,

        child: props.child,
      }),
  };
}

Positioned.filled = function (props: FilledWidgetProps) {
  return {
    builder: (context: BuildableContext) =>
      new PositionedRenderObject({
        key: props.key,
        parentKey: context.parentKey,

        widgetType: Positioned.name,
        widgetDomTag: DomTag.span,

        sizingUnit: MeasuringUnit.percent,
        width: 100,
        height: 100,

        positioningUnit: props.positioningUnit ?? MeasuringUnit.pixel,
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right,

        child: props.child,
      }),
  };
};

class PositionedRenderObject extends RenderObject {
  private props: RenderObjectProps;

  constructor(props: RenderObjectProps) {
    super(props);

    this.props = props;
  }

  render(domNode: HTMLElement) {
    let sizingUnit = mapMeasuringUnit(this.props.sizingUnit);
    let positioningUnit = mapMeasuringUnit(this.props.positioningUnit);

    if (undefined != this.props.top) {
      domNode.style.top = this.props.top.toString() + positioningUnit;
    }
    if (undefined != this.props.bottom) {
      domNode.style.bottom = this.props.bottom.toString() + positioningUnit;
    }
    if (undefined != this.props.left) {
      domNode.style.left = this.props.left.toString() + positioningUnit;
    }
    if (undefined != this.props.right) {
      domNode.style.right = this.props.right.toString() + positioningUnit;
    }

    if (undefined != this.props.width) {
      domNode.style.width = this.props.width.toString() + sizingUnit;
    }
    if (undefined != this.props.height) {
      domNode.style.height = this.props.height.toString() + sizingUnit;
    }

    new Painter(this.context, domNode).renderSingleWidget(this.props.child);
  }
}
