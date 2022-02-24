## Positioned.fill widget

Similar to Positioned widget but it takes up entire available space.

### Props

```typescript
type PositionedProps = {
  key?: string;

  child: props.child;
};
```

### Usage

```typescript
Container({
  child: Stack({
    children: [
      Positioned.fill({
        child: Text("this takes up entire space"),
      }),
    ],
  }),
});
```
