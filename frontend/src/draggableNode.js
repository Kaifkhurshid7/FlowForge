export const DraggableNode = ({ type, label, description, accent }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="toolbar-node"
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      style={{ '--node-accent': accent }}
    >
      <span className="toolbar-node-label">{label}</span>
      <span className="toolbar-node-description">{description}</span>
    </div>
  );
};
