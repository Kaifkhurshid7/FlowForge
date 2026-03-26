import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const LoggerNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);

  return (
    <BaseNode
      title="Logger"
      subtitle="Trace pipeline state for debugging and observability."
      accent="#0EA5E9"
      inputs={[{ id: `${id}-message`, label: 'Message' }]}
      outputs={[{ id: `${id}-output`, label: 'Forward' }]}
    >
      <label className="node-field">
        <span>Level</span>
        <select
          value={data?.level || 'info'}
          onChange={(event) => updateNodeField(id, 'level', event.target.value)}
        >
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </label>

      <label className="node-field">
        <span>Message</span>
        <input
          value={data?.message || ''}
          onChange={(event) =>
            updateNodeField(id, 'message', event.target.value)
          }
        />
      </label>
    </BaseNode>
  );
};
