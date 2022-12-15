import { EditorView, Decoration, DecorationSet } from '@codemirror/view';
import { StateField, StateEffect } from '@codemirror/state';
import './useHighlight.scss';

const useHighlight = () => {
  // 高亮数组
  const highlightList = [];

  // 通过事务的更改映射其范围。旧集指的是旧文档中的位置，新状态必须得到一个包含新文档中位置的集合
  const addUnderline = StateEffect.define({
    map: ({ from, to }, change) => ({ from: change.mapPos(from), to: change.mapPos(to) }),
  });

  // 装饰标记
  const underlineMark = Decoration.mark({ class: 'cm-highlight' });

  const underlineField = StateField.define({
    create() {
      return Decoration.none;
    },
    update(underlines, tr) {
      underlines = underlines.map(tr.changes);
      // eslint-disable-next-line
      for (const e of tr.effects) {
        if (e.is(addUnderline)) {
          underlines = underlines.update({
            add: [underlineMark.range(e.value.from, e.value.to)],
          });
        }
      }
      return underlines;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

  // codemirror会读取css/scss中的样式，这里不设置或者设置样式，都会被覆盖
  const underlineTheme = EditorView.baseTheme({
    // '.cm-underline': { textDecoration: 'underline 3px red' },
    // '.cm-underline': { backgroundColor: 'yellow', color: 'black !important' },
  });

  const underlineSelection = (view) => {
    const effects = view.state.selection.ranges
      .filter((r) => !r.empty)
      .map(({ from, to }) => addUnderline.of({ from, to }));

    if (!effects.length) return false;

    if (!view.state.field(underlineField, false)) {
      effects.push(StateEffect.appendConfig.of([underlineField, underlineTheme]));
    }

    view.dispatch({ effects });

    console.log('underlineSelection', effects, underlineField, view);
    return true;
  };
  // const underlineSelection = (view) => {
  //   const effects = view.state.selection.ranges
  //     .filter((r) => !r.empty)
  //     .map(({ from, to }) => addUnderline.of({ from, to }));

  //   if (!effects.length) return false;

  //   if (!view.state.field(underlineField, false)) {
  //     effects.push(StateEffect.appendConfig.of([underlineField, underlineTheme]));
  //   }

  //   highlightList.push({ effects });
  //   // view.dispatch({ effects });

  //   console.log('underlineSelection', effects, underlineField, view);
  //   return true;
  // };

  return underlineSelection;
};

export default useHighlight;
