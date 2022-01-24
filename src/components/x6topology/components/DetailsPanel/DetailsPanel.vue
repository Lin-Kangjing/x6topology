<!--
 * @Description: 详情面板
 * @FilePath: \x6topology\src\components\x6topology\components\DetailsPanel\DetailsPanel.vue
 * @Date: 2022-01-06 09:46:14
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-21 15:51:53
 * @author: Lin_kangjing
-->
<template>
  <div class="DetailsPanel theme">
    <div id="minimap" class="minimap"></div>
    <div v-if="cell" class="info">
      <!-- <div class="title-bar">模型信息</div> -->
      <el-collapse v-model="active">
        <!-- 位置和大小 -->
        <el-collapse-item title="" name="position">
          <div class="title-bar" slot="title">位置和大小</div>
          <div class="attr-wrapper">
            <el-row :gutter="gutter">
              <el-col :span="8">X</el-col>
              <el-col :span="16">
                <el-input-number
                  v-model="attr.x"
                  controls-position="right"
                  :size="size"
                  :min="0"
                  @change="(val) => boxChange('x', val)"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">Y</el-col>
              <el-col :span="16">
                <el-input-number
                  v-model="attr.y"
                  controls-position="right"
                  :size="size"
                  :min="0"
                  @change="(val) => boxChange('y', val)"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">宽</el-col>
              <el-col :span="16">
                <el-input-number
                  v-model="attr.width"
                  controls-position="right"
                  :size="size"
                  :min="0"
                  @change="(val) => boxChange('width', val)"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">高</el-col>
              <el-col :span="16">
                <el-input-number
                  v-model="attr.height"
                  controls-position="right"
                  :size="size"
                  :min="0"
                  @change="(val) => boxChange('height', val)"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">角度</el-col>
              <el-col :span="16">
                <el-input-number
                  v-model="attr.rotate"
                  controls-position="right"
                  :size="size"
                  :min="0"
                  :max="360"
                  @change="(val) => boxChange('rotate', val)"
                ></el-input-number>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <!-- 样式 -->
        <el-collapse-item title="" name="style">
          <div class="title-bar" slot="title">样式</div>
          <div class="attr-wrapper">
            <el-row :gutter="gutter">
              <el-col :span="8">线条样式</el-col>
              <el-col :span="16">
                <el-select
                  v-model="attr.shape_strokeDasharray"
                  :size="size"
                  placeholder="请选择"
                  @change="(val) => styleChange('strokeDasharray', val)"
                >
                  <el-option
                    v-for="item in shapeBorderTypeOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>

            <el-row :gutter="gutter">
              <el-col :span="8">线条宽度</el-col>
              <el-col :span="16">
                <el-select
                  v-model="attr.shape_strokeWidth"
                  :size="size"
                  placeholder="请选择"
                  @change="(val) => styleChange('strokeWidth', val)"
                >
                  <el-option
                    v-for="item in shapeBorderWidthOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">线条颜色</el-col>
              <el-col :span="16">
                <el-color-picker
                  v-model="attr.shape_stroke"
                  :size="size"
                  show-alpha
                  @change="(val) => styleChange('stroke', val)"
                ></el-color-picker>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">背景颜色</el-col>
              <el-col :span="16">
                <el-color-picker
                  v-model="attr.shape_fill"
                  :size="size"
                  show-alpha
                  @change="(val) => styleChange('fill', val)"
                ></el-color-picker>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <!-- 文本 -->
        <el-collapse-item title="" name="text">
          <div class="title-bar" slot="title">文本</div>
          <div class="attr-wrapper">
            <el-row :gutter="gutter">
              <el-col :span="8">字体大小</el-col>
              <el-col :span="16">
                <el-select
                  v-model="attr.label_fontSize"
                  :size="size"
                  placeholder="请选择"
                  @change="(val) => textChange('fontSize', val)"
                >
                  <el-option
                    v-for="item in labelFontSizeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">字体颜色</el-col>
              <el-col :span="16">
                <el-color-picker
                  v-model="attr.label_fill"
                  :size="size"
                  show-alpha
                  @change="(val) => textChange('fill', val)"
                ></el-color-picker>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">字体名</el-col>
              <el-col :span="16">
                <el-select
                  v-model="attr.label_fontFamily"
                  :size="size"
                  placeholder="请选择"
                  @change="(val) => textChange('fontFamily', val)"
                >
                  <el-option
                    v-for="item in labelFontFamilyOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">字体样式</el-col>
              <el-col :span="16">
                <el-checkbox-group
                  v-model="attr.label_fontStyle"
                  :size="size"
                  @change="(val) => textChange('labelFontStyle', val)"
                >
                  <el-checkbox-button
                    v-for="item in labelFontStyleOptions"
                    :key="item.icon"
                    :label="item.styleKey"
                    ><svg class="iconpark-icon">
                      <use :href="item.icon"></use>
                    </svg>
                  </el-checkbox-button>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row :gutter="gutter">
              <el-col :span="8">内容</el-col>
              <el-col :span="16">
                <el-input
                  v-model="attr.label"
                  type="textarea"
                  :size="size"
                  @change="(val) => textChange('label', val)"
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
import "../../utils/svgIcon";
import bus from "../../utils/bus";
import { state, mutations } from "../../store";
function getAttr() {
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
    label: "",
    label_fontSize: "",
    label_fill: "",
    label_fontFamily: "",
    label_fontStyle: [],
  };
}
export default {
  components: {},
  data() {
    return {
      active: ["text"],
      gutter: 15,
      size: "small",
      attr: getAttr(),
      // node线条类型
      shapeBorderTypeOptions: Object.freeze([
        { label: "实线", value: null },
        { label: "虚线", value: "8 5" },
      ]),
      // node线宽度
      shapeBorderWidthOptions: Object.freeze([1, 2, 3, 4, 5, 10]),
      // 文本fontsize
      labelFontSizeOptions: Object.freeze([12, 13, 14, 15, 16, 17, 18, 19, 20]),
      // 字体名
      labelFontFamilyOptions: Object.freeze([
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
      ]),
      // 字体Style
      labelFontStyleOptions: Object.freeze([
        {
          styleKey: "fontWeight",
          icon: "#text-bold",
          title: "文字加粗",
        },
        {
          styleKey: "fontStyle",
          icon: "#text-italic",
          title: "文字斜体",
        },
        {
          styleKey: "textDecoration",
          icon: "#text-underline",
          title: "文字下划线",
        },
      ]),
      // 字体style maps
      fontStyleKeyMaps: Object.freeze({
        fontWeight: "bold",
        fontStyle: "italic",
        textDecoration: "underline",
      }),
    };
  },
  computed: {
    cell() {
      return state.cell;
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
    init() {
      state.g.on("cell:click", ({ cell }) => {
        mutations.setCell(cell);
        this.attr = getAttr();
        // 设置x,y,width,height
        const box = cell.getBBox();
        for (const key in this.attr) {
          if (Object.hasOwnProperty.call(this.attr, key) && key in box) {
            this.attr[key] = box[key];
          }
        }

        // 设置旋转角度
        this.attr.rotate = cell.getAngle();

        // 设置shape的样式属性
        const shape = cell.shape;
        let attrs = cell.getAttrs();
        let shapeAttrs = attrs && attrs[shape];
        if (!shapeAttrs) shapeAttrs = attrs.body;
        if (shapeAttrs) {
          this.attr.shape_strokeDasharray = shapeAttrs.strokeDasharray
            ? "虚线"
            : "实线";
          this.attr.shape_strokeWidth = shapeAttrs.strokeWidth;
          this.attr.shape_stroke = shapeAttrs.stroke;
          this.attr.shape_fill = shapeAttrs.fill;
        }

        // 设置文本
        let labelAttr = attrs.text;
        if (labelAttr) {
          this.attr.label = labelAttr.text;
          this.attr.label_fontSize = labelAttr.fontSize;
          this.attr.label_fill = labelAttr.fill;
          // 设置加粗，斜体，下划线
          const styleKeyMaps = this.fontStyleKeyMaps;
          const fontStyle = [];
          Object.keys(styleKeyMaps).forEach((styleKey) => {
            if (labelAttr[styleKey] && labelAttr[styleKey] !== "none") {
              fontStyle.push(styleKey);
            }
          });
          this.attr.label_fontStyle = fontStyle;
          // 字体名
          let fontFamily = labelAttr.fontFamily || "";
          if (fontFamily) {
            fontFamily = fontFamily.split(", ");
            fontFamily = fontFamily[0] ? fontFamily[0] : "";
          }
          this.attr.label_fontFamily = fontFamily;
          console.log(this.attr);
        }
      });
      // 点击空白画布cell 设置位null
      state.g.on("blank:click", () => {
        mutations.setCell(null);
      });
    },
    // 属性改变(x,y,width,height,rotate)
    boxChange(type, val) {
      // 设置宽高width,height
      if (["width", "height"].includes(type)) {
        state.cell.resize(this.attr.width, this.attr.height);
      } else if (["x", "y"].includes(type)) {
        //设置位置x，y
        state.cell.position(this.attr.x, this.attr.y);
      } else if (type === "rotate") {
        // 设置旋转角度
        state.cell.rotate(val, { absolute: true });
      }
    },
    // 属性样式改变
    styleChange(type, val) {
      const shape = state.cell.shape;
      let prePath = shape;
      if (!state.cell.attrs[shape]) prePath = "body";
      state.cell.setAttrByPath(`${prePath}/${type}`, val);
    },
    // 文字属性样式改变
    textChange(type, val) {
      if (type === "labelFontStyle") {
        const styleKeyMaps = this.fontStyleKeyMaps;
        Object.keys(styleKeyMaps).forEach((styleKey) => {
          if (val.includes(styleKey)) {
            state.cell.setAttrByPath(
              `text/${styleKey}`,
              styleKeyMaps[styleKey]
            );
          } else {
            state.cell.setAttrByPath(`text/${styleKey}`, "none");
          }
        });
      } else {
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
  font-size: 12px;
  line-height: 32px;
  border-bottom: 1px solid #ededed;
}

/* 折叠面板 */
.el-collapse {
  border-top: 0;
}
.DetailsPanel /deep/ .el-collapse-item__header {
  background-color: #ededed;
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid #fff;
}
.DetailsPanel /deep/ .el-collapse-item__wrap {
  background-color: inherit;
  border-bottom: 1px solid #fff;
}
/* 折叠面板的属性 */
.attr-wrapper {
  padding: 10px 15px;
}
.attr-wrapper .el-col {
  margin: 3px 0;
}
.attr-wrapper .el-col-8 {
  display: flex;
  align-items: center;
  height: 32px;
}
/* 表单类型 ui */
.attr-wrapper /deep/ .el-input__inner {
  text-align: left;
  padding-right: 39px;
  padding-left: 10px;
}
.attr-wrapper /deep/ .el-input__inner,
/* .attr-wrapper /deep/ .el-checkbox-button__inner, */
.attr-wrapper /deep/ .el-textarea__inner {
  border-color: transparent;
  background: transparent;
}
.attr-wrapper /deep/ .el-input-number:hover .el-input__inner,
.attr-wrapper /deep/ .el-select:hover .el-input__inner,
.attr-wrapper /deep/ .el-textarea:hover .el-textarea__inner,
/* .attr-wrapper /deep/ .el-checkbox-button:hover .el-checkbox-button__inner, */
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
