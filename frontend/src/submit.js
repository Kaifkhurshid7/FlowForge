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
        <div className={`submit-status ${analysisResult.is_dag ? 'valid' : 'invalid'}`}>
          {analysisResult.is_dag ? '✓ DAG Valid' : '✕ Cycle Detected'}
        </div>
      )}
      <button
        className="submit-button"
        type="button"
        onClick={submitPipeline}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Analyzing...' : 'Submit Pipeline'}
      </button>
    </div>
  );
};
