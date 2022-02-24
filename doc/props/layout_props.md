## Layout props

Layout widgets, such as Positioned, accept values for their width, height, left, right... properties. By default, provided values represents pixels i.e `Positioned({width: 40, ...})` will be mapped to `width: 100px`.

But sometimes you might want to set `width` of a width to some percentage/propotion of parent widget. In flutter you might do it using things like LayoutBuilder, AspectRatio. In Proton we can directly leverage browser capabilities for such things without any additional work.

Therefore it's important to know how to use them. There are two types of layout props that a widget can accept

- Sizing props: `width:`, and `height:`
- Positioning props: `top:`, `bottom:`, `left:` and `right:`

If a widget accept Sizing props it'll also have a optional `sizingUnit` prop that you can set to tell framework exactly how to treat your provided width/height values. Similarly if a widget accept Positioning props it'll also have a optional `positioningUnit` prop.

### Example

- `MeasuringUnit.pixel`: provided values will be used as pixels(px)

  ```typescript
    width: 40, // width will be 40px
    sizingUnit: MeasuringUnit.pixel,
  ```

- `MeasuringUnit.percent`: provided values will be used as percent(%)

  ```typescript
    width: 40, // width will be 40%
    sizingUnit: MeasuringUnit.percent,
  ```
