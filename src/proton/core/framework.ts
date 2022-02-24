import { DomObject } from "./dom_object.js";
import { RenderObject } from "./render_object.js";

export class Framework {
  private static isInit = false;

  private static monotonicId = 0;

  private static domObjects = new Map<string, DomObject>();
  private static renderedObjects = new Map<string, RenderObject>();

  static init() {
    if (this.isInit) {
      throw "Framework aleady initialized.";
    }

    this.isInit = true;
  }

  static generateId() {
    this.monotonicId++;
    return this.monotonicId.toString() + "_" + Math.random().toString().substring(3);
  }

  static build(objects: RenderObject | RenderObject[]) {
    if (!this.isInit) {
      throw `Framework not initialized.
      If you're building your own AppWidget implementation, make sure to call Framework.init().`;
    }

    let renderObjects: RenderObject[];

    renderObjects = objects instanceof Array ? objects : [objects];

    let flagIsSingleChild = true; // assume widget is single and has no siblings

    for (let renderObject of renderObjects) {
      if (flagIsSingleChild) {
        if (this.rebuild(renderObject.context.key)) {
          return;
        }
      }

      console.log(
        `Build ${flagIsSingleChild ? "" : "sibling"}: ${renderObject.context.widgetType} #${renderObject.context.key}`,
      );

      this.registerRenderObject(renderObject);

      let domObject = new DomObject(renderObject.context);

      this.registerDomObject(domObject);

      // dispose inner contents

      if (flagIsSingleChild) {
        this.disposeDomNodes(domObject.parent(), true);
      }

      // lifecycle hook, dom node is about to mount

      renderObject.beforeDomNodeMount();

      // mount dom node

      domObject.mount();

      // lifecycle hook, dom node is mounted

      renderObject.afterDomNodeMount();

      // lifecycle hook, paint childs contents

      renderObject.render(domObject.domNode);

      // turn off isSingle flag
      // if there are more widgets, loop will iterate and build them as siblings
      flagIsSingleChild = false;
    }
  }

  // internal

  private static rebuild(key: string) {
    let renderObject = this.findRenderObject(key);

    if (undefined == renderObject) {
      return false;
    }

    let domObject = this.findDomObject(key);

    if (undefined == domObject) {
      throw "Something went wrong";
    }

    /**
     * we'are directly disposing all child nodes and then rebuilding
     * whole subtree after this widget. this is the easiest way to
     * ensure that all required childs are updated.
     *
     * more performant way would be to:
     *
     * - decouple interface and data part of a widget by creating
     *   a implicit state element(object) for each widet. this way
     *   rebuild process will be:
     *
     *    1. pass parent's element to immediate childs only
     *    2. childs will merge parent's element with their elements
     *    3. child then compare if they have to rebuild themselves
     *    4. if yes: child pass element to its childs and so on
     *       if no: child will ignore and won't cascade rebuilds
     *
     * for now goal is to make this thing work. moreover, browsers are
     * not so bad at building webpages. after all that's what they do
     */

    this.disposeDomNodes(domObject.domNode, true);

    console.log(`Rebuild: type: ${renderObject.context.widgetType} key: ${renderObject.context.key}`);

    renderObject.render(domObject.domNode);

    return true;
  }

  /**
   * @param preserveTarget if on, domNode itself wont be removed
   */
  private static disposeDomNodes(domNode: HTMLElement | null, preserveTarget: boolean) {
    if (null == domNode) {
      return;
    }

    if (domNode.hasChildNodes()) {
      for (let childDomElement of domNode.childNodes) {
        this.disposeDomNodes(childDomElement as HTMLElement, false);
      }
    }

    if (preserveTarget) return;

    if (domNode === document.body || undefined == domNode.dataset?.wtype) {
      return;
    }

    let renderObject = this.findRenderObject(domNode.id);
    if (undefined == renderObject) {
      console.log("Render object not found: ", domNode);
      return;
    }

    // lifecycle hook, about to remove dom node

    renderObject.beforeDomNodeRemove();

    // unregister both render and dom node

    this.unRegisterRenderObject(renderObject.context.key);

    this.unRegisterDomObject(renderObject.context.key);

    // remove dom node

    domNode.remove();
  }

  private static findRenderObject(key: string) {
    return this.renderedObjects.get(key);
  }

  private static findDomObject(key: string) {
    return this.domObjects.get(key);
  }

  private static registerRenderObject(renderObject: RenderObject) {
    this.renderedObjects.set(renderObject.context.key, renderObject);
  }

  private static registerDomObject(domObject: DomObject) {
    this.domObjects.set(domObject.context.key, domObject);
  }

  private static unRegisterRenderObject(key: string) {
    this.renderedObjects.delete(key);
  }

  private static unRegisterDomObject(key: string) {
    this.domObjects.delete(key);
  }
}
