/*
 * @Description:键盘快捷键绑定
 * @FilePath: \x6topology\src\components\x6topology\utils\keyboard.js
 * @Date: 2022-01-10 15:15:53
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-14 16:31:24
 * @author: Lin_kangjing
 */
// 绑定键盘快捷键
function bindKeys(g) {
  // 复制
  g.bindKey("ctrl+c", () => {
    const cells = g.getSelectedCells();
    if (cells.length) {
      g.copy(cells);
    }
    return false;
  });
  // 粘贴
  g.bindKey("ctrl+v", () => {
    if (!g.isClipboardEmpty()) {
      const cells = g.paste({ offset: 32 });
      g.cleanSelection();
      g.select(cells);
    }
    return false;
  });
  // 删除
  g.bindKey(
    ["backspace", "delete"],
    () => {
      const cells = g.getSelectedCells();
      if (cells.length) {
        let removeCells = [];
        cells.forEach((cell) => {
          // tools 中如果开启了node-editor 节点编辑工具，就不是直接删除本节点了
          const tools = cell.getTools();
          if (tools && tools.items) {
            if (!tools.items.find((e) => e.name === "node-editor")) {
              removeCells.push(cell);
            }
          } else {
            removeCells.push(cell);
          }
        });
        g.removeCells(removeCells);
      }
      return false;
    },
    "keyup"
  );
}
export default bindKeys;
