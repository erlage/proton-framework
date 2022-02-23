import { AppWidget } from "./app_widget.js";
import { Widget, WidgetFoundationProps } from "../../core/types.js";

type AppProps = WidgetFoundationProps & {
  target: string;
  home: Widget;
};

export class ProtonApp extends AppWidget {
  constructor(props: AppProps) {
    super({
      key: props.key,
      parentKey: props.target,

      child: props.home,
    });
  }
}
