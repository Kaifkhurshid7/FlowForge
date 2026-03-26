from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import PipelineAnalysis, PipelinePayload
from services.dag_validator import is_dag

app = FastAPI(title="FlowForge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"ping": "pong"}


@app.post("/pipelines/parse", response_model=PipelineAnalysis)
def parse_pipeline(payload: PipelinePayload) -> PipelineAnalysis:
    """
    Parses the submitted pipeline and returns analysis results.
    Calculates node count, edge count, and DAG validity.
    """
    return PipelineAnalysis(
        num_nodes=len(payload.nodes),
        num_edges=len(payload.edges),
        is_dag=is_dag(payload.nodes, payload.edges),
    )
