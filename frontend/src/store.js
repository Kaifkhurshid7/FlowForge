import { create } from 'zustand';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from 'reactflow';

import { parsePipeline } from './services/api';
import { buildPipelinePayload } from './utils/graphUtils';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  analysisResult: null,
  isModalOpen: false,
  isSubmitting: false,
  submissionError: '',
  getNodeID: (type) => {
    const nextNodeIDs = { ...get().nodeIDs };
    nextNodeIDs[type] = (nextNodeIDs[type] || 0) + 1;
    set({ nodeIDs: nextNodeIDs });
    return `${type}-${nextNodeIDs[type]}`;
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 18,
            height: 18,
            color: '#8B5CF6',
          },
          style: {
            strokeWidth: 2,
            stroke: '#8B5CF6',
          },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [fieldName]: fieldValue,
              },
            }
          : node
      ),
    });
  },
  closeModal: () => {
    set({ isModalOpen: false });
  },
  submitPipeline: async () => {
    set({ isSubmitting: true, submissionError: '' });

    try {
      const payload = buildPipelinePayload(get().nodes, get().edges);
      const analysisResult = await parsePipeline(payload);

      set({
        analysisResult,
        isModalOpen: true,
        isSubmitting: false,
        submissionError: '',
      });
    } catch (error) {
      set({
        analysisResult: null,
        submissionError:
          error.message || 'Unable to analyze the pipeline right now.',
        isSubmitting: false,
        isModalOpen: true,
      });
    }
  },
}));
