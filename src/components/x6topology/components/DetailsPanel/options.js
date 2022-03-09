/*
 * @Description:DetailsPanel 中的下拉数据
 * @FilePath: \x6topology\src\components\X6topology\components\DetailsPanel\options.js
 * @Date: 2022-02-17 16:53:28
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-09 11:35:02
 * @author: Lin_kangjing
 */
// node线条类型
export const borderTypeOptions = Object.freeze([
  { label: "实线", value: null },
  { label: "虚线", value: "8 5" },
]);
// node线宽度
export const borderWidthOptions = Object.freeze([1, 2, 3, 4, 5, 10]);
// 文本fontsize
export const labelFontSizeOptions = Object.freeze([
  12, 13, 14, 15, 16, 17, 18, 19, 20,
]);
// 字体名
export const labelFontFamilyOptions = Object.freeze([
  "Arial",
  "Helvetica",
  "Microsoft JhengHei",
  "SimSun",
  "SimHei",
  "NSimSun",
  "PMingLiU",
  "MingLiU",
  "DFKai-SB",
  "FangSong",
  "GB2312 KaiTi_GB2312",
  "Sans-serif",
]);
// 字体Style
export const labelFontStyleOptions = Object.freeze([
  {
    styleKey: "fontWeight",
    icon: "text-bold",
    title: "文字加粗",
  },
  {
    styleKey: "fontStyle",
    icon: "text-italic",
    title: "文字斜体",
  },
  {
    styleKey: "textDecoration",
    icon: "text-underline",
    title: "文字下划线",
  },
]);
// 字体style maps
export const fontStyleKeyMaps = Object.freeze({
  fontWeight: "bold",
  fontStyle: "italic",
  textDecoration: "underline",
});
// 标签位置
export const labelPositionOptions = Object.freeze([
  "中",
  "上",
  "右",
  "下",
  "左",
]);
// 标签位置map
export const labelPositionMap = Object.freeze({
  上: {
    label: {
      refY: -10,
      textAnchor: "middle",
      textVerticalAnchor: "middle",
    },
  },
  右: {
    label: {
      refX: "100%",
      refX2: 4,
      textAnchor: "start",
      textVerticalAnchor: "middle",
    },
  },
  下: {
    label: {
      refY: "100%",
      refY2: 10,
      textAnchor: "middle",
      textVerticalAnchor: "middle",
    },
  },
  左: {
    label: {
      refX: 0,
      refX2: -4,
      textAnchor: "end",
      textVerticalAnchor: "middle",
    },
  },
  中: {
    label: {
      textAnchor: "middle",
      textVerticalAnchor: "middle",
    },
  },
});
// 连线箭头
export const edgeArrowTypeOptions = Object.freeze([
  { value: "block", label: "实心箭头", args: { size: 6 }, icon: "" },
  { value: "classic", label: "经典箭头", args: { size: 6 }, icon: "" },
  { value: "diamond", label: "菱形箭头", args: { size: 8 }, icon: "" },
  { value: "circle", label: "圆形箭头", args: { size: 6 }, icon: "" },
  // { value: "circlePlus", args: { size: 6 }, icon: "" },
  // { value: "ellipse", args: { rx: 6, ry: 4 }, icon: "" },
  // { value: "cross", args: { size: 8, offset: 1 }, icon: "" },
  { value: "async", label: "单边箭头", args: { size: 8, offset: 1 }, icon: "" },
]);
// 连线箭头map
export const edgeArrowTypeMap = Object.freeze(
  edgeArrowTypeOptions.reduce((pre, cur) => {
    pre[cur.value] = cur.args;
    return pre;
  }, {})
);
