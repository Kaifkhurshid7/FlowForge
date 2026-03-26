import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const ConditionNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="Condition"
      subtitle="Split execution paths with boolean logic."
      accent="#14B8A6"
      inputs={[
        { id: `${id}-left`, label: 'Input' },
        { id: `${id}-right`, label: 'Rule' },
      ]}
      outputs={[
        { id: `${id}-true`, label: 'True' },
        { id: `${id}-false`, label: 'False' },
      ]}
    >
      <label className="node-field">
        <span>Expression</span>
        <input
          value={data?.expression || ''}
          onChange={(event) =>
            updateNodeField(id, 'expression', event.target.value)
          }
        />
      </label>
    </BaseNode>
  );
};
