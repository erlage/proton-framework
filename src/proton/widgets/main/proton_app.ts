import { AppWidget } from "./app_widget.js";
import { DomTag } from "../../core/enums.js";
import { Widget, WidgetFoundationProps } from "../../core/types.js";

import "../../styles/proton_app.css";

type AppProps = WidgetFoundationProps & {
  target: string;
  home: Widget;
};

export class ProtonApp extends AppWidget {
  constructor(props: AppProps) {
    super({
      key: props.key,
      parentKey: props.target,

      widgetType: ProtonApp.name,
      widgetDomTag: DomTag.div,

      child: props.home,
    });
  }
}
