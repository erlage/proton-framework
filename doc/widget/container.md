## Container widget

HTML's div abstraction.

## Props

```typescript
type ContainerProps = {
  key?: string;

  class: string;
  classes: string[];

  child: Widget;
};
```

## Usage

```typescript
Container({
  child: Text({
    text: "Some text",
  }),
});
```
