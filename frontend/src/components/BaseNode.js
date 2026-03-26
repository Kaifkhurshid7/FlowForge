import { Handle, Position } from 'reactflow';

/**
 * Computes the vertical percentage offset for a handle based on its index and total count.
 * @param {number} index - The index of the handle.
 * @param {number} total - The total number of handles of this type.
 * @returns {string} The CSS top property value.
 */
const getHandleOffset = (index, total) => {
  if (total <= 1) {
    return '50%';
  }

  return `${((index + 1) * 100) / (total + 1)}%`;
};

/**
 * A reusable container for pipeline nodes that provides consistent styling,
 * headers, and dynamic handle placement for inputs and outputs.
 * 
 * @param {Object} props
 * @param {string} props.title - The primary label of the node.
 * @param {string} props.subtitle - A short description of the node's function.
 * @param {string} props.accent - A hex color used for the node's visual identity.
 * @param {Array<{id: string, label: string}>} [props.inputs] - List of input handles.
 * @param {Array<{id: string, label: string}>} [props.outputs] - List of output handles.
 * @param {React.ReactNode} props.children - The body content of the node.
 */
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
