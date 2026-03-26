import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const MathNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="Math"
      subtitle="Apply arithmetic or aggregation to flowing values."
      accent="#FB7185"
      inputs={[
        { id: `${id}-a`, label: 'A' },
        { id: `${id}-b`, label: 'B' },
      ]}
      outputs={[{ id: `${id}-result`, label: 'Result' }]}
    >
      <label className="node-field">
        <span>Operation</span>
        <select
          value={data?.operation || 'sum'}
          onChange={(event) =>
            updateNodeField(id, 'operation', event.target.value)
          }
        >
          <option value="sum">Sum</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </label>

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
