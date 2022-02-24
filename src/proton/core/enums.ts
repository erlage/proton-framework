export enum DomTag {
  div,
  span,
}

export enum MeasuringUnit {
  pixel,
  percent,
}

export function mapDomTag(tag: DomTag) {
  switch (tag) {
    case DomTag.div:
      return "div";

    case DomTag.span:
    default:
      return "span";
  }
}

export function mapMeasuringUnit(unit: MeasuringUnit) {
  switch (unit) {
    case MeasuringUnit.percent:
      return "%";

    case MeasuringUnit.pixel:
    default:
      return "px";
  }
}
