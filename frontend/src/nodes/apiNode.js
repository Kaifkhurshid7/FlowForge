import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const ApiNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="API"
      subtitle="Call an external service inside the pipeline."
      accent="#F43F5E"
      inputs={[{ id: `${id}-payload`, label: 'Payload' }]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
    >
      <label className="node-field">
        <span>Method</span>
        <select
          value={data?.method || 'POST'}
          onChange={(event) => updateNodeField(id, 'method', event.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
        </select>
      </label>

      <label className="node-field">
        <span>Endpoint</span>
        <input
          value={data?.endpoint || ''}
          onChange={(event) =>
            updateNodeField(id, 'endpoint', event.target.value)
          }
        />
      </label>
    </BaseNode>
  );
};
