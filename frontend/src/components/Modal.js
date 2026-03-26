import { useStore } from '../store';

const selector = (state) => ({
  analysisResult: state.analysisResult,
  submissionError: state.submissionError,
  isModalOpen: state.isModalOpen,
  closeModal: state.closeModal,
});

export const ResultModal = () => {
  const { analysisResult, submissionError, isModalOpen, closeModal } =
    useStore(selector);

  if (!isModalOpen) {
    return null;
  }

  const isSuccess = Boolean(analysisResult) && !submissionError;

  return (
    <div className="modal-overlay" role="presentation" onClick={closeModal}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pipeline-analysis-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-badge">{isSuccess ? 'Pipeline Analysis' : 'Error'}</div>
        <h2 id="pipeline-analysis-title">
          {isSuccess ? 'Validation complete' : 'Submission failed'}
        </h2>
        <p className="modal-copy">
          {isSuccess
            ? 'Backend analysis finished and returned graph metrics for this workflow.'
            : submissionError}
        </p>

        {isSuccess ? (
          <div className="result-grid">
            <div className="result-card">
              <span>Nodes</span>
              <strong>{analysisResult.num_nodes}</strong>
            </div>
            <div className="result-card">
              <span>Edges</span>
              <strong>{analysisResult.num_edges}</strong>
            </div>
            <div className="result-card result-card-wide">
              <span>Valid DAG</span>
              <strong>{analysisResult.is_dag ? 'Yes' : 'No'}</strong>
            </div>
          </div>
        ) : null}

        <button className="modal-close" type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};
