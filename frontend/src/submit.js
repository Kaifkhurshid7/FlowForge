import { useStore } from './store';

const selector = (state) => ({
  submitPipeline: state.submitPipeline,
  isSubmitting: state.isSubmitting,
  analysisResult: state.analysisResult,
});

export const SubmitButton = () => {
  const { submitPipeline, isSubmitting, analysisResult } = useStore(selector);

  return (
    <div className="submit-shell">
      {analysisResult && !isSubmitting && (
        <div
          className={`submit-status ${analysisResult.is_dag ? 'valid' : 'invalid'}`}
        >
          <span className="status-text">
            {analysisResult.is_dag ? 'Valid Workflow' : 'Circular Loop Detected'}
          </span>
        </div>
      )}
      <button
        className="submit-button"
        type="button"
        onClick={submitPipeline}
        disabled={isSubmitting}
      >
        <span className="btn-text">
          {isSubmitting ? 'Analyzing...' : 'Submit Pipeline'}
        </span>
      </button>
    </div>
  );
};
