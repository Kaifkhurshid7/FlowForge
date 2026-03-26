import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './styles/theme';

export const PipelineToolbar = () => {
  return (
    <aside className="toolbar-shell">
      <div className="toolbar-copy">
        <p className="eyebrow">Node Library</p>
        <h2>FlowForge</h2>
        <p>
          Build reusable pipelines with abstraction-first nodes and live
          validation feedback.
        </p>
      </div>

      <div className="toolbar-grid">
        {toolbarNodes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            description={node.description}
            accent={node.accent}
          />
        ))}
      </div>
    </aside>
  );
};
