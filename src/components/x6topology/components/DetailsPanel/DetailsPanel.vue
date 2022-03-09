<!--
 * @Description: 详情面板
 * @FilePath: \x6topology\src\components\X6topology\components\DetailsPanel\DetailsPanel.vue
 * @Date: 2022-01-06 09:46:14
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-09 11:41:17
 * @author: Lin_kangjing
-->
<template>
  <div class="DetailsPanel theme">
    <div id="minimap" class="minimap"></div>
    <div v-if="cell" class="info">
      <!-- <div class="title-bar">模型信息</div> -->
      <el-collapse v-model="active" accordion>
        <el-collapse-item
          v-for="item in detailsPanel"
          :key="item.name"
          :name="item.name"
        >
          <div class="title-bar" slot="title">{{ item.name }}</div>
          <div class="attr-wrapper">
            <el-row
              v-for="attr in item.attrs"
              :key="attr.name"
              :gutter="gutter"
            >
              <el-col :span="8">{{ attr.name }}</el-col>
              <el-col :span="16">
                <!-- 数字 -->
                <el-input-number
                  v-if="attr.formControls === 'el-input-number'"
                  v-model="cellAttr[attr.attrName]"
                  controls-position="right"
                  :size="size"
                  :min="0"
                  @change="(val) => item.changeFn(attr.attrName, val)"
                ></el-input-number>
                <!-- 下拉 -->
                <el-select
                  v-else-if="attr.formControls === 'el-select'"
                  v-model="cellAttr[attr.attrName]"
                  :size="size"
                  placeholder="请选择"
                  @change="(val) => item.changeFn(attr.attrName, val)"
                >
                  <el-option
                    v-for="option in attr.options"
                    :key="typeof option === 'object' ? option.value : option"
                    :label="typeof option === 'object' ? option.label : option"
                    :value="typeof option === 'object' ? option.value : option"
                  >
                    <div v-if="attr.isArrow">
                      {{ option.label }}
                    </div>
                  </el-option>
                </el-select>
                <!-- 颜色 -->
                <el-color-picker
                  v-else-if="attr.formControls === 'el-color-picker'"
                  v-model="cellAttr[attr.attrName]"
                  :size="size"
                  show-alpha
                  @change="(val) => item.changeFn(attr.attrName, val)"
                ></el-color-picker>
                <!-- 字体样式 -->
                <!-- <div v-else-if="attr.formControls === 'el-checkbox-group'">
                  {{ attr.options }}
                </div> -->
                <el-checkbox-group
                  v-else-if="attr.formControls === 'el-checkbox-group'"
                  v-model="cellAttr[attr.attrName]"
                  :size="size"
                  @change="(val) => item.changeFn(attr.attrName, val)"
                >
                  <el-checkbox-button
                    v-for="font in attr.options"
                    :key="font.title"
                    :label="font.styleKey"
                  >
                    <svg class="iconpark-icon">
                      <use :href="'#' + font.icon"></use>
                    </svg>
                  </el-checkbox-button>
                </el-checkbox-group>
                <!-- 文字内容 -->
                <el-input
                  v-else-if="attr.formControls === 'el-textarea'"
                  v-model="cellAttr[attr.attrName]"
                  type="textarea"
                  :size="size"
                  @change="(val) => item.changeFn(attr.attrName, val)"
                ></el-input>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import { state, mutations } from "../../store";
import {
  borderTypeOptions,
  borderWidthOptions,
  // 文字
  labelFontSizeOptions,
  labelFontFamilyOptions,
  labelFontStyleOptions,
  labelPositionOptions,
  labelPositionMap,
  fontStyleKeyMaps,
  // 边
  edgeArrowTypeOptions,
  // edgeArrowTypeMap,
} from "./options";
// 获取基本属性
function getInitCellAttr() {
  return {
    x: "",
    y: "",
    width: "",
    height: "",
    // 旋转角度
    rotate: "",
    // shape 的设置
    shape_strokeDasharray: "",
    shape_strokeWidth: "",
    shape_stroke: "",
    shape_fill: "",
    // label 的设置
    text: "",
    text_fontSize: "",
    text_fill: "",
    text_fontFamily: "",
    text_fontStyle: [],
    text_position: "",
    // edge
    line_strokeDasharray: "",
    line_strokeWidth: "",
    line_stroke: "",
    line_sourceMarker: "",
    line_targetMarker: "",
  };
}
export default {
  components: {},
  data() {
    return {
      active: ["标签"],
      gutter: 15,
      size: "small",
      cellAttr: getInitCellAttr(), //节点边属性
      // 节点面板
      nodePanel: Object.freeze([
        {
          name: "位置和大小",
          changeFn: this.boxChange,
          attrs: [
            {
              name: "X",
              attrName: "x",
              formControls: "el-input-number",
            },
            {
              name: "Y",
              attrName: "y",
              formControls: "el-input-number",
            },
            {
              name: "宽度",
              attrName: "width",
              formControls: "el-input-number",
            },
            {
              name: "高度",
              attrName: "height",
              formControls: "el-input-number",
            },
            {
              name: "角度",
              attrName: "rotate",
              formControls: "el-input-number",
            },
          ],
        },
        {
          name: "样式",
          changeFn: this.styleChange,
          attrs: [
            {
              name: "线条样式",
              attrName: "shape_strokeDasharray",
              formControls: "el-select",
              options: borderTypeOptions,
            },
            {
              name: "线条宽度",
              attrName: "shape_strokeWidth",
              formControls: "el-select",
              options: borderWidthOptions,
            },
            {
              name: "线条颜色",
              attrName: "shape_stroke",
              formControls: "el-color-picker",
            },
            {
              name: "背景颜色",
              attrName: "shape_fill",
              formControls: "el-color-picker",
            },
          ],
        },
        {
          name: "标签",
          changeFn: this.textChange,
          attrs: [
            {
              name: "内容",
              attrName: "text",
              formControls: "el-textarea",
            },
            {
              name: "位置",
              attrName: "text_position",
              formControls: "el-select",
              options: labelPositionOptions,
            },
            {
              name: "字体大小",
              attrName: "text_fontSize",
              formControls: "el-select",
              options: labelFontSizeOptions,
            },
            {
              name: "字体颜色",
              attrName: "text_fill",
              formControls: "el-color-picker",
            },
            {
              name: "字体名",
              attrName: "text_fontFamily",
              formControls: "el-select",
              options: labelFontFamilyOptions,
            },
            {
              name: "字体样式",
              attrName: "text_fontStyle",
              formControls: "el-checkbox-group",
              options: labelFontStyleOptions,
            },
          ],
        },
      ]),
      edgePanel: Object.freeze([
        {
          name: "样式",
          changeFn: this.edgeStyleChange,
          attrs: [
            {
              name: "线条样式",
              attrName: "line_strokeDasharray",
              formControls: "el-select",
              options: borderTypeOptions,
            },
            {
              name: "线条宽度",
              attrName: "line_strokeWidth",
              formControls: "el-select",
              options: borderWidthOptions,
            },
            {
              name: "线条颜色",
              attrName: "line_stroke",
              formControls: "el-color-picker",
            },
            {
              name: "始端样式",
              isArrow: true,
              attrName: "line_sourceMarker",
              formControls: "el-select",
              options: edgeArrowTypeOptions,
            },
            {
              name: "末端样式",
              isArrow: true,
              attrName: "line_targetMarker",
              formControls: "el-select",
              options: edgeArrowTypeOptions,
            },
          ],
        },
        {
          name: "文本",
          changeFn: this.textChange,
          attrs: [
            {
              name: "内容",
              attrName: "text",
              formControls: "el-textarea",
            },
            // {
            //   name: "位置",
            //   attrName: "text_position",
            //   formControls: "el-select",
            //   options: labelPositionOptions,
            // },
            {
              name: "字体大小",
              attrName: "text_fontSize",
              formControls: "el-select",
              options: labelFontSizeOptions,
            },
            {
              name: "字体颜色",
              attrName: "text_fill",
              formControls: "el-color-picker",
            },
            {
              name: "字体名",
              attrName: "text_fontFamily",
              formControls: "el-select",
              options: labelFontFamilyOptions,
            },
            {
              name: "字体样式",
              attrName: "text_fontStyle",
              formControls: "el-checkbox-group",
              options: labelFontStyleOptions,
            },
          ],
        },
      ]),
    };
  },
  computed: {
    // 当前点击到的节点，或边
    cell() {
      return state.cell;
    },
    // 详情面板内容
    detailsPanel() {
      return state.cell.isNode() ? this.nodePanel : this.edgePanel;
    },
  },
  created() {},
  mounted() {
    bus.$on("init", this.init);
    this.$on("hook:beforeDestroy", () => {
      bus.$off("init");
    });
  },
  methods: {
    // 初始化
    init() {
      state.g.on("cell:click", ({ cell }) => {
        mutations.setCell(cell);
        this.cellAttr = getInitCellAttr();
        let attrs = cell.getAttrs();
        const shape = cell.shape;
        // 设置节点
        if (cell.isNode()) {
          this.active = [this.nodePanel[0].name];
          // 设置x,y,width,height
          const box = cell.getBBox();
          for (const key in this.cellAttr) {
            if (Object.hasOwnProperty.call(this.cellAttr, key) && key in box) {
              this.cellAttr[key] = box[key];
            }
          }

          // 设置旋转角度
          this.cellAttr.rotate = cell.getAngle();
          // 设置label定位
          let labelAttr = attrs.label;
          if (labelAttr) {
            let pos = "下";
            for (const key in labelPositionMap) {
              if (Object.hasOwnProperty.call(labelPositionMap, key)) {
                const labelStr = JSON.stringify(labelPositionMap[key]);
                if (labelStr === JSON.stringify(labelAttr)) {
                  pos = key;
                  break;
                }
              }
            }
            this.cellAttr.text_position = pos;
          }
          console.log(attrs);
          // 设置shape的样式属性
          let shapeAttrs = attrs && attrs[shape];
          if (!shapeAttrs) shapeAttrs = attrs.body;
          if (shapeAttrs) {
            this.cellAttr.shape_strokeDasharray = shapeAttrs.strokeDasharray
              ? "虚线"
              : "实线";
            this.cellAttr.shape_strokeWidth = shapeAttrs.strokeWidth;
            this.cellAttr.shape_stroke = shapeAttrs.stroke;
            this.cellAttr.shape_fill =
              shapeAttrs.fill === "none" ? null : shapeAttrs.fill;
          }
        } else {
          this.active = [this.edgePanel[0].name];
          //设置边
          const lineAttrs = attrs.line;
          if (lineAttrs) {
            this.cellAttr.line_strokeDasharray = lineAttrs.strokeDasharray
              ? "虚线"
              : "实线";
            this.cellAttr.line_strokeWidth = lineAttrs.strokeWidth;
            this.cellAttr.line_stroke = lineAttrs.stroke;
          }
        }
        // 设置文本
        let textAttr = attrs.text; //其他shape的label
        if (shape === "edge") {
          // 边的label
          textAttr = this.getEdgeLabelAttr();
        }
        if (textAttr) {
          this.cellAttr.text = textAttr.text;
          this.cellAttr.text_fontSize = textAttr.fontSize;
          this.cellAttr.text_fill = textAttr.fill;
          // 设置加粗，斜体，下划线
          const styleKeyMaps = fontStyleKeyMaps;
          const fontStyle = [];
          Object.keys(styleKeyMaps).forEach((styleKey) => {
            if (textAttr[styleKey] && textAttr[styleKey] !== "none") {
              fontStyle.push(styleKey);
            }
          });
          this.cellAttr.text_fontStyle = fontStyle;
          // 字体名
          let fontFamily = textAttr.fontFamily || "";
          if (fontFamily) {
            fontFamily = fontFamily.split(", ");
            fontFamily = fontFamily[0] ? fontFamily[0] : "";
          }
          this.cellAttr.text_fontFamily = fontFamily;
        }
      });
      // 点击空白画布cell 设置位null
      state.g.on("blank:click", () => {
        mutations.setCell(null);
      });
    },
    // 获取边的label 的attr属性
    getEdgeLabelAttr() {
      const cell = state.cell;
      let textAttr;
      let labels = cell.getLabelAt(0);
      if (!labels) {
        labels = cell.getDefaultLabel();
        textAttr = labels && labels.attrs && labels.attrs.text;
      } else {
        const label = labels.attrs.label.text;
        textAttr = cell.getAttrs().text;
        textAttr.text = label;
      }
      return textAttr || {};
    },
    // 属性改变(x,y,width,height,rotate)
    boxChange(type, val) {
      // 设置宽高width,height
      if (["width", "height"].includes(type)) {
        state.cell.resize(this.cellAttr.width, this.cellAttr.height);
      } else if (["x", "y"].includes(type)) {
        //设置位置x，y
        state.cell.position(this.cellAttr.x, this.cellAttr.y);
      } else if (type === "rotate") {
        // 设置旋转角度
        state.cell.rotate(val, { absolute: true });
      }
    },
    // 属性样式改变
    styleChange(type, val) {
      type = type.split("_")[1] || type;
      const shape = state.cell.shape;
      let prePath = shape;
      if (!state.cell.attrs[shape]) prePath = "body";
      if (val === null) val = "none";
      state.cell.setAttrByPath(`${prePath}/${type}`, val);
    },
    // 文字属性样式改变
    textChange(type, val) {
      // 字体样式，粗体，斜体，等
      if (type === "text_fontStyle") {
        Object.keys(fontStyleKeyMaps).forEach((styleKey) => {
          if (val.includes(styleKey)) {
            state.cell.setAttrByPath(
              `text/${styleKey}`,
              fontStyleKeyMaps[styleKey]
            );
          } else {
            state.cell.setAttrByPath(`text/${styleKey}`, "none");
          }
        });
      } else if (type === "text_position") {
        state.cell.setAttrs(labelPositionMap[val] || {}, { deep: false });
      } else if (type === "text" && state.cell.shape === "edge") {
        //设置边的label
        state.cell.setLabels([val]);
      } else {
        type = type.split("_")[1] || type;
        state.cell.setAttrByPath(`text/${type}`, val);
      }
    },
    // 边样式改变
    edgeStyleChange(type, val) {
      const [path, path2] = type.split("_");
      if (val === null) val = "none";
      state.cell.setAttrByPath(`${path}/${path2}`, val);
    },
    // 文字属性样式改变
    edgeTextChange(type, val) {
      // 字体样式，粗体，斜体，等
      if (type === "text_fontStyle") {
        Object.keys(fontStyleKeyMaps).forEach((styleKey) => {
          if (val.includes(styleKey)) {
            state.cell.setAttrByPath(
              `text/${styleKey}`,
              fontStyleKeyMaps[styleKey]
            );
          } else {
            state.cell.setAttrByPath(`text/${styleKey}`, "none");
          }
        });
      } else if (type === "text" && state.cell.shape === "edge") {
        //设置边的label
        state.cell.setLabels([val]);
      } else {
        type = type.split("_")[1] || type;
        console.log(type);
        state.cell.setAttrByPath(`text/${type}`, val);
      }
    },
  },
};
</script>
<style scoped>
.DetailsPanel {
  height: 100%;
}
.minimap {
  width: 100%;
  height: 170px;
}
.info {
  padding-top: 5px;
}
.title-bar {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 5px 0 8px;
  color: #666;
  font-weight: 700;
  font-size: 14px;
  line-height: 32px;
  /* border-bottom: 1px solid #ededed; */
}

/* 折叠面板 */
/* .el-collapse {
  border-top: 0;
} */
.DetailsPanel /deep/ .el-collapse-item__header {
  height: 40px;
  line-height: 40px;
  /* background-color: #ededed;
  border-bottom: 1px solid #fff; */
}
/* .DetailsPanel /deep/ .el-collapse-item__wrap {
  background-color: inherit;
  border-bottom: 1px solid #fff;
} */
/* 折叠面板的属性 */
.attr-wrapper {
  padding: 10px 15px;
}
.attr-wrapper .el-row {
  display: flex;
  align-items: center;
}
.attr-wrapper .el-col {
  margin: 3px 0;
}
/* 表单类型 ui */
.attr-wrapper /deep/ .el-input__inner {
  text-align: left;
  padding-right: 39px;
  padding-left: 10px;
}
.attr-wrapper /deep/ .el-input__inner,
.attr-wrapper /deep/ .el-textarea__inner {
  border-color: transparent;
  background: transparent;
}
.attr-wrapper /deep/ .el-input-number:hover .el-input__inner,
.attr-wrapper /deep/ .el-select:hover .el-input__inner,
.attr-wrapper /deep/ .el-textarea:hover .el-textarea__inner,
.attr-wrapper /deep/ .el-input:hover .el-input__inner {
  border-color: #dcdfe6;
  background: #fff;
}
.attr-wrapper /deep/ .el-input-number__decrease,
.attr-wrapper /deep/ .el-input-number__increase {
  opacity: 0;
}
.attr-wrapper /deep/ .el-input-number:hover .el-input-number__decrease,
.attr-wrapper /deep/ .el-input-number:hover .el-input-number__increase {
  opacity: 1;
}
.attr-wrapper /deep/ .el-checkbox-button--small .el-checkbox-button__inner {
  padding: 7.5px 12px;
}
</style>
