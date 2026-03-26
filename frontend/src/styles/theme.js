export const theme = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceStrong: '#F1F5F9',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  accent: '#4F46E5',
  grid: 'rgba(79, 70, 229, 0.08)',
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
