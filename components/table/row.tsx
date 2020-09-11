import React from 'react';

import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { concat, ComponentProps } from '@/utils/component';

type DragableTableProps = ComponentProps<{
  index: number;
  dragKey: string;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}>;

type DragDropObject = ComponentProps<{
  type: string;
  index: number;
}>;

export default function DragableRow(props: DragableTableProps) {
  const ref = React.useRef();
  const { dragKey, index, onMove, ...restProps } = props;
  var { style } = props;

  const type = dragKey;

  const [{}, drop] = useDrop<DragDropObject, DragDropObject, DragDropObject>({
    accept: type,
    drop: (item) => {
      if (!!onMove) onMove(item.index, index);
      return item;
    },
  });

  const [{}, drag] = useDrag<DragDropObject, DragDropObject, DragDropObject>({
    item: { type, index },
  });

  if (!!onMove) {
    drop(drag(ref));
    style = { cursor: 'move', ...style };
  }
  return <tr ref={ref} style={style} {...restProps} />;
}
