import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const DelayNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="Delay"
      subtitle="Pause execution between workflow stages."
      accent="#EAB308"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
    >
      <label className="node-field">
        <span>Duration</span>
        <input
          type="number"
          min="0"
          value={data?.duration || '5'}
          onChange={(event) =>
            updateNodeField(id, 'duration', event.target.value)
          }
        />
      </label>

      <label className="node-field">
        <span>Unit</span>
        <select
          value={data?.unit || 'seconds'}
          onChange={(event) => updateNodeField(id, 'unit', event.target.value)}
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </label>
    </BaseNode>
  );
};
