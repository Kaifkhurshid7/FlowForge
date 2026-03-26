from models import PipelineEdge, PipelineNode


def is_dag(nodes: list[PipelineNode], edges: list[PipelineEdge]) -> bool:
    """
    Checks whether a given graph of nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Depth-First Search (DFS) for cycle detection.
    
    Args:
        nodes: A list of Pydantic Node models.
        edges: A list of Pydantic Edge models linking the nodes.
        
    Returns:
        bool: True if the graph is a DAG, False if a cycle is detected.
    """
    graph = {node.id: [] for node in nodes}

    for edge in edges:
        if edge.source not in graph or edge.target not in graph:
            return False
        graph[edge.source].append(edge.target)

    visited: set[str] = set()
    active_stack: set[str] = set()

    def dfs(node_id: str) -> bool:
        if node_id in active_stack:
            return False
        if node_id in visited:
            return True

        active_stack.add(node_id)
        for neighbor in graph[node_id]:
            if not dfs(neighbor):
                return False
        active_stack.remove(node_id)
        visited.add(node_id)
        return True

    return all(dfs(node_id) for node_id in graph)
