## Stateful widget

A stateful widget is a widget that can be used to describe dynamic user interface. `StatefulWidget` exposes three lifecycle methods and one state function(`setState`).

## Props

```typescript
type StatelessWidgetProps = {
  key?: string;
};
```

## Lifecycle methods

- `initState()` - called before widget build.
- `build(context: BuildContext): Widget` - called after state is initialized, should return a interface to build.
- `dispose()` - fired before framework disposes the widget.

## Functions

- `setState(callable?: CallableFuntion)` - can be used to force a widget rebuild. Please note that `setState()` cascade rebuild call i.e it forces every child widget to rebuild itself. If you've any `StatefulWidget`s in child tree then those'll be disposed off too and framework will rebuild them one by one.

## Usage

- Simple state example:

  ```typescript
  class MyStatefulWidget extends StatefulWidget {
    private isClicked = false;

    build() {
      return GestureDetector({
        child: Text({
          text: this.isClicked ? "clicked" : "click me!",
        }),

        onTap: () => this.handleTap(),
      });
    }

    private handleTap() {
      this.isClicked = true;

      this.setState();
    }
  }
  ```

- Complete example:

  ```typescript
  class MyStatefulWidget extends StatefulWidget {
    private isClicked = false;

    init() {
      console.log("widget is ready");
    }

    build(context: BuildContext) {
      return GestureDetector({
        child: Text({
          text: this.isClicked ? "clicked" : "click me!",
        }),

        onTap: () => this.handleTap(),
      });
    }

    private handleTap() {
      this.setState(() => (this.isClicked = true));
    }

    dispose() {
      console.log("widget disposed");
    }
  }
  ```
