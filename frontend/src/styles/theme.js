export const theme = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceStrong: '#111C34',
  border: '#334155',
  text: '#E2E8F0',
  muted: '#94A3B8',
  accent: '#8B5CF6',
  grid: 'rgba(148, 163, 184, 0.18)',
};

export const toolbarNodes = [
  {
    type: 'customInput',
    label: 'Input',
    description: 'Entry point',
    accent: '#38BDF8',
  },
  {
    type: 'llm',
    label: 'LLM',
    description: 'AI processing',
    accent: '#A855F7',
  },
  {
    type: 'customOutput',
    label: 'Output',
    description: 'Final result',
    accent: '#F97316',
  },
  {
    type: 'text',
    label: 'Text',
    description: 'Dynamic template',
    accent: '#22C55E',
  },
  {
    type: 'api',
    label: 'API',
    description: 'External call',
    accent: '#F43F5E',
  },
  {
    type: 'delay',
    label: 'Delay',
    description: 'Wait step',
    accent: '#EAB308',
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'Branch logic',
    accent: '#14B8A6',
  },
  {
    type: 'logger',
    label: 'Logger',
    description: 'Debug trace',
    accent: '#0EA5E9',
  },
  {
    type: 'math',
    label: 'Math',
    description: 'Compute values',
    accent: '#FB7185',
  },
];
