import { useEffect, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';

import { BaseNode } from '../components/BaseNode';
import { useAutoResize } from '../hooks/useAutoResize';
import { useVariableParser } from '../hooks/useVariableParser';
import { useStore } from '../store';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

export const TextNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);
  const textValue = data?.text || '';
  const variables = useVariableParser(textValue);

  useAutoResize(textareaRef, textValue);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, updateNodeInternals]);

  return (
    <BaseNode
      title="Text"
      subtitle="Smart template node with dynamic variable handles."
      accent="#22C55E"
      inputs={variables.map((variable) => ({
        id: `${id}-${variable.handleId}`,
        label: variable.label,
      }))}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
    >
      <label className="node-field">
        <span>Template</span>
        <textarea
          ref={textareaRef}
          value={textValue}
          rows={1}
          placeholder="Summarize {{topic}} for {{audience}}"
          onChange={(event) => updateNodeField(id, 'text', event.target.value)}
        />
      </label>

      <div className="node-helper">
        {variables.length > 0
          ? `Variables: ${variables.map((variable) => variable.label).join(', ')}`
          : 'Add {{variable}} placeholders to generate input handles.'}
      </div>
    </BaseNode>
  );
};
