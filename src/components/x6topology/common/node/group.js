/*
 * @Description:分组节点
 * @FilePath: \x6topology\src\components\x6topology\common\node\group.js
 * @Date: 2022-01-11 10:24:57
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-19 15:53:26
 * @author: Lin_kangjing
 */
import { Node } from "@antv/x6";
class Group extends Node {
  collapsed = false;
  expandSize = {};

  postprocess() {
    this.toggleCollapse(false);
  }

  isCollapsed() {
    return this.collapsed;
  }

  toggleCollapse(collapsed) {
    const target = collapsed == null ? !this.collapsed : collapsed;
    if (target) {
      this.attr("buttonSign", { d: "M 1 5 9 5 M 5 1 5 9" });
      this.expandSize = this.getSize();
      this.resize(100, 32);
    } else {
      this.attr("buttonSign", { d: "M 2 5 8 5" });
      if (this.expandSize) {
        this.resize(this.expandSize.width, this.expandSize.height);
      }
    }
    this.collapsed = target;
  }
}

Group.define({
  shape: "group",
  zIndex: 0,
  markup: [
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "text",
      selector: "label",
    },
    {
      tagName: "g",
      selector: "buttonGroup",
      children: [
        {
          tagName: "rect",
          selector: "button",
        },
        {
          tagName: "path",
          selector: "buttonSign",
        },
      ],
    },
  ],
  attrs: {
    body: {
      refWidth: "100%",
      refHeight: "100%",
      strokeWidth: 1,
      fill: "#fffbe6",
      stroke: "#000000",
    },
    buttonGroup: {
      refX: 8,
      refY: 8,
    },
    button: {
      height: 14,
      width: 16,
      rx: 2,
      ry: 2,
      fill: "#f5f5f5",
      stroke: "#ccc",
      cursor: "pointer",
      event: "node:collapse",
    },
    buttonSign: {
      refX: 3,
      refY: 2,
      stroke: "#808080",
    },
    label: {
      fontSzie: 12,
      fill: "#000000",
      refX: 32,
      refY: 6,
    },
  },
});
export default Group;
