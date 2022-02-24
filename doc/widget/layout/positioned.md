## Positioned widget

A widget that control position on child as well as its size. Usually used to position child of Stack widget.

### Props

```typescript
type PositionedProps = {
  key?: string;

  width: number;
  height: number;
  sizingUnit: MeasuringUnit;

  top: number;
  bottom: number;
  left: number;
  right: number;
  positioningUnit: MeasuringUnit;

  child: props.child;
};
```

### Usage

```typescript
Container({
  child: Stack({
    children: [
      Positioned({
        top: 10
        child: Text("well done"),
      }),
    ],
  }),
});
```
