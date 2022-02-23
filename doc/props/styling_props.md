## Styling props

You can directly pass CSS classes to some widgets. Two CSS specific props are:

1. `class: string`
2. `classes: string[]`

## Usage

- Adding a single CSS class using `class` prop:

  ```typescript
  Container({
    class: "some-css-class",
  });
  ```

- Adding multiple classes using `class` prop:

  ```typescript
  Container({
    class: "some-css-class another-class",
  });
  ```

- Adding multiple classes as list(more flexible) using `classes` prop:

  ```typescript
  Container({
    classes: ["some-css-class", "another-class"],
  });
  ```
