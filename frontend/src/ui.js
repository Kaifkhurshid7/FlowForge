import { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';

import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ApiNode } from './nodes/apiNode';
import { DelayNode } from './nodes/delayNode';
import { ConditionNode } from './nodes/conditionNode';
import { LoggerNode } from './nodes/loggerNode';
import { MathNode } from './nodes/mathNode';
import { theme } from './styles/theme';

import 'reactflow/dist/style.css';

const gridSize = 24;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: ApiNode,
  delay: DelayNode,
  condition: ConditionNode,
  logger: LoggerNode,
  math: MathNode,
};

const nodeDefaults = {
  customInput: { inputName: 'input_value', inputType: 'Text' },
  customOutput: { outputName: 'output_value', outputType: 'Text' },
  llm: { model: 'gpt-4.1-mini', temperature: '0.7' },
  text: { text: '{{input}}' },
  api: { method: 'POST', endpoint: 'https://api.example.com/process' },
  delay: { duration: '5', unit: 'seconds' },
  condition: { expression: 'score > 0.8' },
  logger: { level: 'info', message: 'Pipeline checkpoint reached' },
  math: { operation: 'sum', expression: 'a + b' },
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const minimapStyle = useMemo(
    () => ({
      backgroundColor: theme.surfaceStrong,
      border: `1px solid ${theme.border}`,
      borderRadius: 18,
    }),
    []
  );

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
    ...nodeDefaults[type],
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        return;
      }

      const rawData = event?.dataTransfer?.getData('application/reactflow');
      if (!rawData) {
        return;
      }

      const appData = JSON.parse(rawData);
      const type = appData?.nodeType;
      if (!type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <section className="canvas-shell">
      <div className="canvas-header">
        <div>
          <p className="eyebrow">Visual Pipeline Builder</p>
          <h1>Compose AI and workflow DAGs in real time.</h1>
        </div>
        <p className="canvas-copy">
          Drag nodes onto the canvas, wire dependencies, and submit for
          backend DAG validation.
        </p>
      </div>

      <div ref={reactFlowWrapper} className="canvas-frame">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          fitView
          connectionLineType="smoothstep"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { stroke: theme.accent, strokeWidth: 2 },
          }}
        >
          <Background color={theme.grid} gap={gridSize} />
          <Controls
            position="bottom-right"
            showInteractive={false}
            style={minimapStyle}
          />
          <MiniMap
            pannable
            zoomable
            nodeColor={theme.accent}
            maskColor="rgba(15, 23, 42, 0.78)"
            style={minimapStyle}
          />
        </ReactFlow>
      </div>
    </section>
  );
};
