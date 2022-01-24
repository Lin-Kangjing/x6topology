/*
 * @Description:文本节点（x6本来有一个文本节点text-block,因为是设置text比较麻烦，不用了）
 * @FilePath: \x6topology\src\components\x6topology\common\node\textBox.js
 * @Date: 2022-01-19 14:14:49
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-21 14:58:34
 * @author: Lin_kangjing
 */
import { Node, ObjectExt } from "@antv/x6";
const TextBox = Node.define({
  constructorName: "text-box",
  shape: "text-box",
  markup: [
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "text",
      selector: "label",
    },
  ],
  attrs: {
    body: {
      fill: "none",
      stroke: "none",
      refWidth: "100%",
      refHeight: "100%",
    },
    // foreignObject: {
    //   refWidth: "100%",
    //   refHeight: "100%",
    // },
    text: {
      fontSize: 14,
      fill: "#000000",
      refX: 0.5,
      refY: 0.5,
      textAnchor: "middle",
      textVerticalAnchor: "middle",
      fontFamily: "Arial, helvetica, sans-serif",
    },
  },
  propHooks(metadata) {
    const { label, ...others } = metadata;
    if (label) {
      ObjectExt.setByPath(others, "attrs/text/text", label);
    }
    return others;
  },
  // attrHooks: {
  //   label: {
  //     set(text, { cell, view, refBBox, elem, attrs }) {
  //       if (elem instanceof HTMLElement) {
  //         elem.textContent = text;
  //       } else {
  //         // No foreign object
  //         const style = attrs.style || {};
  //         const wrapValue = { text, width: -5, height: "100%" };
  //         const wrapAttrs = {
  //           textVerticalAnchor: "middle",
  //           ...style,
  //         };

  //         const textWrap = Attr.presets.textWrap;
  //         FunctionExt.call(textWrap.set, this, wrapValue, {
  //           cell,
  //           view,
  //           elem,
  //           refBBox,
  //           attrs: wrapAttrs,
  //         });

  //         return { fill: style.color || null };
  //       }
  //     },
  //     position(text, { refBBox, elem }) {
  //       if (elem instanceof SVGElement) {
  //         return refBBox.getCenter();
  //       }
  //     },
  //   },
  // },
});
export default TextBox;
// Graph.registerNode("group", Group);
