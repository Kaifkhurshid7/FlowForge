import { Handle, Position } from 'reactflow';

const getHandleOffset = (index, total) => {
  if (total <= 1) {
    return '50%';
  }

  return `${((index + 1) * 100) / (total + 1)}%`;
};

export const BaseNode = ({
  title,
  subtitle,
  accent,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="base-node" style={{ '--node-accent': accent }}>
      <div className="base-node-header">
        <div className="base-node-accent" />
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          className="node-handle"
          style={{ top: getHandleOffset(index, inputs.length) }}
        />
      ))}

      <div className="base-node-body">{children}</div>

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          className="node-handle"
          style={{ top: getHandleOffset(index, outputs.length) }}
        />
      ))}
    </div>
  );
};
