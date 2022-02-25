## Overlay widget

Overlay widget is similar to Stack widget but it provides more low-level controls.

### Props

```typescript
type ContainerProps = {
  key?: string;

  class: string;
  classes: string[];

  initialEntries: OverlayEntryWidget[];
};
```

## OverlayEntry widget

Unlike Stack, Overlay widget accept childs of only `OverlayEntry` type. This means you've to wrap your child widget in a OverylayEntry widget.

### Props

```typescript
type ContainerProps = {
  key?: string;

  class: string;
  classes: string[];

  opaque: boolean; // default is true

  child: Widget;
};
```

## Overlay.of(context)

You can look up Overlay widget in ancestors using `Overlay.of(context)` to add/remove entries. Overlay.of() returns a OverlayManager instance which supports following methods:

1. `insert(entry: OverlayEntry)` - insert one entry
2. `insertAll(entries: OverlayEntry[])` - insert all entries

## All examples

- With initial entries:

  ```typescript
  Overlay({
    initialEntries: [
      OverlayEntry({
        child: Text("entry 1"),
      }),
      OverlayEntry({
        opaque: false,
        child: Align({
          alignment: Alignment.topRight,
          child: new OverlayTest(),
        }),
      }),
    ],
  });
  ```

- Overlay.of:

  ```typescript
  handleTap() {
    Overlay.of(this.context)?.insert(
      OverlayEntry({
        child: Text("new entry"),
      }),
    );
  }
  ```
