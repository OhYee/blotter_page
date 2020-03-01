import React from 'react';
import { Table } from 'antd';
import {
  DndProvider,
  DragSource,
  DropTarget,
  DragElementWrapper,
  DragSourceOptions,
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { TableProps } from 'antd/lib/table';

interface RowProps extends React.ComponentProps<'tr'> {
  connectDropTarget: DragElementWrapper<any>;
  connectDragSource: DragElementWrapper<DragSourceOptions>;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

class Row extends React.Component<RowProps> {
  render() {
    var { connectDragSource, connectDropTarget, moveRow, ...rest } = this.props;
    var style = { ...this.props.style, cursor: 'move' };

    return connectDragSource(connectDropTarget(<tr {...rest} style={style} />));
  }
}

interface DraggableTableProps extends TableProps<any> {
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const dragSource = DragSource(
  'row',
  {
    beginDrag(props: any) {
      return {
        index: props.index,
      };
    },
  },
  connect => ({
    connectDragSource: connect.dragSource(),
  }),
)(Row);

const DraggablRow = DropTarget(
  'row',
  {
    drop(props: any, monitor) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      props.moveRow(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(dragSource);

export default class DraggableTable extends React.Component<DraggableTableProps> {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          {...this.props}
          // 替换Row
          components={{
            body: {
              row: DraggablRow,
            },
          }}
          onRow={(record, index) => ({
            index,
            onClick: event => {},
            onDoubleClick: event => {},
            onContextMenu: event => {},
            onMouseEnter: event => {},
            onMouseLeave: event => {},
            moveRow: this.props.moveRow,
          })}
        />
      </DndProvider>
    );
  }
}
