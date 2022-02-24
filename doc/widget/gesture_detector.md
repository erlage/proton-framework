## GestureDetector widget

GestureDetector allow you to respond to user's interactions on screen.

## Props

```typescript
type GestureDetectorProps = {
  key?: string;

  onTap?: CallableFunction;
  child: Widget;
  behaviour?: HitTestBehaviour;
};
```

## Supported behaviours:

- `HitTestBehaviour.opaque`: receive events and prevent child gesture detectors from receiving events.
- `HitTestBehaviour.translucent`: all of the detectors that are hit will receive events.
- (default) `HitTestBehaviour.deferToChild`: child gesture detectors will receive events and won't let them propagate to parents.

- `onTap`: callable function that'll be fired when user taps on widget.

- `child`: widget to wrap.

## Usage

- Example using `onTap`:

  ```typescript
  GestureDetector({
    onTap: () => alert("working"),
    child: Text("Some text"),
  });
  ```

- Handling `behaviour` in nested detectors:

  ```typescript
  GestureDetector({
    child: Container({
      child: GestureDetector({
        child: Text("Try clicking here"),

        onTap: () => alert("won't be fired at all cus outer detector is opaque"),
      }),
    }),

    onTap: () => alert("got tap"),

    // make it opaque, won't let childs receive a tap event
    behaviour: HitTestBehaviour.opaque,
  });
  ```
