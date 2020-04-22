import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import BookmarkPreview from '../bookmarks/dragPreview'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  cursor: 'move'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class CustomDragLayer extends Component {
  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    var content;

    switch (itemType) {
      case "element":
        content = <BookmarkPreview item={item.item} />;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {content}
        </div>
      </div>
    );
  }
}