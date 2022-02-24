## Text widget

Text widget displays literal string values on screen.

### Props

```typescript
type TextProps = {
  key?: string;

  class: string;
  classes: string[];

  text: string;

  isHtml?: bool;
};
```

### Usage

- Examples

  ```typescript
  Text({
    text: "Some text",
  });

  Text({
    text: "<string>this isn't strong</strong>", // ->  will be text
  });

  Text({
    text: "<string>this is strong</strong>", // ->  will be bold
    isHtml: true,
  });
  ```

- Text has a shorthand for displaying just text

  ```typescript
  Text("Some text");
  ```
