import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const OutputNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="Output"
      subtitle="Collect the final result of a workflow branch."
      accent="#F97316"
      inputs={[{ id: `${id}-value`, label: 'Input' }]}
    >
      <label className="node-field">
        <span>Name</span>
        <input
          value={data?.outputName || ''}
          onChange={(event) =>
            updateNodeField(id, 'outputName', event.target.value)
          }
        />
      </label>

      <label className="node-field">
        <span>Type</span>
        <select
          value={data?.outputType || 'Text'}
          onChange={(event) =>
            updateNodeField(id, 'outputType', event.target.value)
          }
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="JSON">JSON</option>
        </select>
      </label>
    </BaseNode>
  );
};
