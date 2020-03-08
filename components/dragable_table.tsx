import React from 'react';
import { Table } from 'antd';
import {
  DndProvider,
  DragElementWrapper,
  DragSourceOptions,
  useDrag,
  useDrop,
  DragObjectWithType,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { TableProps } from 'antd/lib/table';
import styles from '@/components/table.less';

interface DragableTableProps<T> extends TableProps<T> {
  dragKey?: string;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

interface DragDropObject extends DragObjectWithType {
  index: number;
}

const DragableRow = props => {
  const ref = React.useRef();
  const { dragKey, index, moveRow, ...restProps } = props;
  var { style } = props;

  if (!!moveRow) {
    const type = dragKey;
    style = { cursor: 'move', ...style };

    const [{}, drop] = useDrop<DragDropObject, DragDropObject, DragDropObject>({
      accept: type,
      drop: (item, m) => {
        if (!!moveRow) moveRow(item.index, index);
        return item;
      },
    });

    const [{}, drag] = useDrag<DragDropObject, DragDropObject, DragDropObject>({
      item: { type, index },
    });

    drop(drag(ref));
  }
  return <tr ref={ref} style={style} {...restProps} />;
};

class DragableTable<T> extends React.Component<DragableTableProps<T>> {
  render() {
    const dragKey = !!this.props.dragKey
      ? this.props.dragKey
      : Math.random()
          .toString(36)
          .slice(-8);
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          {...this.props}
          // 替换Row
          components={{
            body: {
              row: DragableRow,
            },
          }}
          onRow={(record, index) => ({
            onClick: event => {},
            onDoubleClick: event => {},
            onContextMenu: event => {},
            onMouseEnter: event => {},
            onMouseLeave: event => {},
            index,
            moveRow: this.props.moveRow,
            dragKey,
          })}
        />
      </DndProvider>
    );
  }
}

export default DragableTable;
