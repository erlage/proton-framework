## Stateless widget

A stateless widget is a widget that can be used to describe static user interface.

### Props

```typescript
type StatelessWidgetProps = {
  key?: string;
};
```

### Usage

```typescript
class MyWidget extends StatelessWidget {
  build() {
    return Text("Hello world");
  }
}

// can be used as

Container({
  child: new MyWidget(),
});

// again, key can be set on any widget

Container({
  child: new MyWidget({
    key: "some-id",
  }),
});
```
