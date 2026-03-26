import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const InputNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="Input"
      subtitle="Entry point for upstream pipeline data."
      accent="#38BDF8"
      outputs={[{ id: `${id}-value`, label: 'Value' }]}
    >
      <label className="node-field">
        <span>Name</span>
        <input
          value={data?.inputName || ''}
          onChange={(event) =>
            updateNodeField(id, 'inputName', event.target.value)
          }
        />
      </label>

      <label className="node-field">
        <span>Type</span>
        <select
          value={data?.inputType || 'Text'}
          onChange={(event) =>
            updateNodeField(id, 'inputType', event.target.value)
          }
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="JSON">JSON</option>
        </select>
      </label>
    </BaseNode>
  );
};
