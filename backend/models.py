from typing import Any

from pydantic import BaseModel, Field


class PipelineNode(BaseModel):
    id: str
    type: str
    position: dict[str, float] | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class PipelineEdge(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelinePayload(BaseModel):
    nodes: list[PipelineNode]
    edges: list[PipelineEdge]


class PipelineAnalysis(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
