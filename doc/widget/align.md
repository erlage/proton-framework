## Align widget

A widget that aligns its child.

## Props

```typescript
type AlignProps = {
  key?: string;

  alignment: Alignment;

  child: Widget;
};
```

## Supported alignments:

- `Alignment.topLeft`
- `Alignment.topRight`
- `Alignment.bottomLeft`
- `Alignment.bottomRight`

## Usage

```typescript
Container({
  child: Stack({
    children: [
      Align({
        alignment: Alignment.topLeft,
        child: Text("text in left"),
      }),
      Align({
        alignment: Alignment.topRight,
        child: Text("text is right"),
      }),
    ],
  }),
});
```
