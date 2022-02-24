## ProtonApp widget

This widget is a bridge between DOM and framework. It mounts itself to a DOM element and act as a root widget in your app.

## Props

```typescript
type ProtonAppProps = {
  key?: string;

  target?: string;
  home: Widget;
};
```

- `home`: app's contents.
- `target`: id of one of the element in DOM where you want your app to mount.

## Usage

```typescript
new ProtonApp({
  target: "root-div",
  home: Container({
    child: Text("Hello world"),
  }),
});
```
