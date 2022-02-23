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
      child: Text({
        text: "hello world",
      }),
    }),
  });
  ```

- Done! you can test it in a Web browser.

Let's talk more about Widgets in Proton,

## Widget props

Each widget accept different set of properties(params, props, whatever).

Some widgets accept CSS specific props that can be used to style them. You can read more about them [here](https://github.com/erlage/proton-framework/blob/main/doc/props/styling_props.md).

One of the most important prop is `key` prop and is accepted by every widget i.e you can set `key` prop on any widget. Internally `key` is used as widget indentity and hence it should be unique and must not match with any other widget's `key` no matter where your widget is. If not provided, Proton generate it for you.

## Supported widgets

### Function based:

- [Text](https://github.com/erlage/proton-framework/blob/main/doc/widget/text.md)
- [Container](https://github.com/erlage/proton-framework/blob/main/doc/widget/container.md)
- [GestureDetector](https://github.com/erlage/proton-framework/blob/main/doc/widget/gesture_detector.md)

### Class based:

- [ProtonApp](https://github.com/erlage/proton-framework/blob/main/doc/widget/proton_app.md)
- [StatelessWidget](https://github.com/erlage/proton-framework/blob/main/doc/widget/stateless_widget.md)
- [StatefulWidget](https://github.com/erlage/proton-framework/blob/main/doc/widget/stateful_widget.md)

And that's pretty much it.
