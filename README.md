# FlowForge

FlowForge is a visual pipeline builder that lets users compose node-based workflows on a drag-and-drop canvas, connect execution paths, and validate the resulting graph through a FastAPI backend.

This repository is structured as a technical assessment submission and implements the core assignment requirements around reusable node abstraction, dynamic text-node behavior, backend DAG validation, and polished UX feedback.

## Assignment Coverage

### Implemented Requirements

- Reusable `BaseNode` abstraction for consistent node layout, handles, and styling
- Core node types: Input, Output, LLM, and Text
- Additional custom nodes: API, Delay, Condition, Logger, and Math
- Dynamic Text Node variable parsing using `{{variable}}` placeholders
- Auto-resizing text input for the Text Node
- Frontend submission flow that sends `nodes` and `edges` to the backend
- Backend pipeline analysis that returns node count, edge count, and DAG validity
- Modal-based result display for a cleaner user experience
- Modern dark visual design tailored to a developer-facing workflow tool

### Assignment Goals Addressed

- Reduce node duplication through abstraction
- Improve scalability for adding future node types
- Deliver real-time visual feedback while building pipelines
- Validate workflows using backend graph logic
- Present results in a clean, interview-ready architecture

## Tech Stack

### Frontend

- React
- React Flow
- Zustand
- CSS

### Backend

- FastAPI
- Pydantic
- Python

## Project Structure

```text
FlowForge/
├── backend/
│   ├── main.py
│   ├── models.py
│   └── services/
│       └── dag_validator.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── nodes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── store.js
│   │   ├── submit.js
│   │   ├── toolbar.js
│   │   └── ui.js
│   └── package.json
└── README.md
```

## Architecture Overview

### Frontend Layering

- Presentation layer: React components render the toolbar, canvas, nodes, and modal
- State layer: Zustand manages nodes, edges, field updates, modal state, and submission status
- Domain layer: hooks and utilities handle variable parsing, textarea resizing, and payload shaping
- API layer: frontend service sends pipeline data to the backend parse endpoint

### Backend Layering

- API layer: FastAPI exposes the pipeline parsing endpoint
- Schema layer: Pydantic models validate request and response shapes
- Domain layer: DAG validation service checks whether the submitted graph is acyclic

## Feature Highlights

### 1. Reusable Node Abstraction

All nodes are built on top of a shared `BaseNode` component. This keeps the UI consistent and makes new node creation straightforward.

Implemented in:

- `frontend/src/components/BaseNode.js`

### 2. Dynamic Text Node

The Text Node supports:

- auto-resizing textarea behavior
- parsing `{{variable}}` placeholders
- generating dynamic input handles for each detected variable

Implemented in:

- `frontend/src/nodes/textNode.js`
- `frontend/src/hooks/useAutoResize.js`
- `frontend/src/hooks/useVariableParser.js`

### 3. Backend DAG Validation

When the user submits the canvas, the frontend sends the current pipeline graph to the backend. The backend computes:

- number of nodes
- number of edges
- whether the pipeline is a valid DAG

Implemented in:

- `backend/main.py`
- `backend/models.py`
- `backend/services/dag_validator.py`

### 4. Improved UX

The application includes:

- modern dark-theme styling
- animated visual node cards
- floating submit action
- modal-based results instead of browser alerts
- multiple custom nodes for a richer canvas experience

## API Contract

### Endpoint

`POST /pipelines/parse`

### Request Body

```json
{
  "nodes": [],
  "edges": []
}
```

### Response

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Kaifkhurshid7/FlowForge.git
cd FlowForge
```

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` by default.

### 3. Run the backend

From the repository root:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

The backend runs on `http://localhost:8000`.

## How to Use

1. Start the frontend and backend servers.
2. Drag nodes from the toolbar onto the canvas.
3. Connect nodes to create a workflow.
4. Use the Text Node with placeholders like `{{input}}` or `{{topic}}`.
5. Click `Submit Pipeline`.
6. Review the node count, edge count, and DAG validation result in the modal.

## Validation Notes

The DAG validator:

- builds an adjacency list from submitted nodes and edges
- rejects edges that reference missing nodes
- performs DFS cycle detection
- returns `false` when a cycle is found

## Delivered Files of Interest

- `frontend/src/components/BaseNode.js`
- `frontend/src/components/Modal.js`
- `frontend/src/nodes/textNode.js`
- `frontend/src/store.js`
- `frontend/src/ui.js`
- `frontend/src/styles/theme.js`
- `backend/main.py`
- `backend/models.py`
- `backend/services/dag_validator.py`

## Submission Summary

This submission focuses on clean architecture, reusability, frontend polish, and correct backend graph validation. The codebase is organized to make future node expansion simple while keeping the user interaction model intuitive and developer-friendly.
