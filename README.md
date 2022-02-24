## Proton

Proton is frontend framework inspired from Flutter.

To begin, let's take a look at a StatelessWidget

```typescript
class HomePage extends StatelessWidget {
  build(context) {
    return GestureDetector({
      child: Text("Hello world!"),

      onTap: () => log("just got a click!"),
    });
  }
}
```

You might have spotted the difference. Proton is a TypeScript framework and example shown above is actually written in TypeScript.

Let's take a look at how to use above widget:

```typescript
new ProtonApp({
    target: "root-div",
    home: Container({
        child: new HomePage(),
    });
});
```

To run this example, you've to install Proton.

## Install

- `npm install proton-framework` or (`npm i https://github.com/erlage/proton-framework` for in-dev version)

- Create a empty `<body>`/`<div>` tag to mark the spot where you want to display `ProtonApp`:

  ```html
  <body>
    <div id="root-div"></div>
  </body>
  ```

- Import ProtonApp & Widgets:

  ```typescript
  import { ProtonApp, Container, Text } from "../node_modules/proton-framework/dist/proton.js";
  ```

- Create a [ProtonApp](https://github.com/erlage/proton-framework/blob/main/src/proton/widgets/main/proton_app.ts) inside your ts code:

  ```typescript
  new ProtonApp({
    key: "proton-app",
    target: "root-div",
    home: Container({
      child: Text("Hello world!"),
    }),
  });
  ```

- Done! you can test it in a Web browser.

Let's talk more about Widgets in Proton,

## Widget props

Each widget accept different set of properties(params, props, whatever).

1. Widget's key property is one of the most important prop. Internally `key` is used as widget indentity for lookups on rebuilds. Therefore it must uniquely identifies a widget in your entire app. For that reason, it's made optional and framework will take care of generating it for you. However you can set it if you want just make sure to keep it unique app-wide.

2. **Styling props** are CSS specific props which can be used to directly apply CSS rules on a widget... [read more](https://github.com/erlage/proton-framework/blob/main/doc/props/styling_props.md).

3. **Layout props** deals with Widget's layout. Widgets that accept props such as width-height also accept special props which can be used to alter the default way framework measure provided values... [read more](https://github.com/erlage/proton-framework/blob/main/doc/props/layout_props.md).

## Widgets index

### Elements:

- [Text](https://github.com/erlage/proton-framework/blob/main/doc/widget/elements/text.md)

### Layout:

- [Container](https://github.com/erlage/proton-framework/blob/main/doc/widget/layout/container.md)
- [Stack](https://github.com/erlage/proton-framework/blob/main/doc/widget/layout/stack.md)
- [Positioned](https://github.com/erlage/proton-framework/blob/main/doc/widget/layout/positioned.md)
  - [Positioned.filled](https://github.com/erlage/proton-framework/blob/main/doc/widget/layout/positioned.filled.md)
- [Align](https://github.com/erlage/proton-framework/blob/main/doc/widget/layout/align.md)

### Gestures:

- [GestureDetector](https://github.com/erlage/proton-framework/blob/main/doc/widget/gestures/gesture_detector.md)

### Main:

- [ProtonApp](https://github.com/erlage/proton-framework/blob/main/doc/widget/main/proton_app.md)
- [StatelessWidget](https://github.com/erlage/proton-framework/blob/main/doc/widget/main/stateless_widget.md)
- [StatefulWidget](https://github.com/erlage/proton-framework/blob/main/doc/widget/main/stateful_widget.md)

... working on more
