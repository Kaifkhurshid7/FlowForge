import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const LLMNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="LLM"
      subtitle="Prompt, system context, and response generation."
      accent="#A855F7"
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
    >
      <label className="node-field">
        <span>Model</span>
        <input
          value={data?.model || ''}
          onChange={(event) => updateNodeField(id, 'model', event.target.value)}
        />
      </label>

      <label className="node-field">
        <span>Temp</span>
        <input
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={data?.temperature || '0.7'}
          onChange={(event) =>
            updateNodeField(id, 'temperature', event.target.value)
          }
        />
      </label>
    </BaseNode>
  );
};
