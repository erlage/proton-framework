## Stack widget

A widget that positions its children relative to the edges of its box.

## Props

```typescript
type StackProps = {
  key?: string;

  children: Widget[];
};
```

## Usage

```typescript
Container({
  child: Stack({
    children: [
      Text("Some text"),
      ...
    ],
  }),
});
```
