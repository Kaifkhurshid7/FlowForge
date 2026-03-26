import { useStore } from './store';

const selector = (state) => ({
  submitPipeline: state.submitPipeline,
  isSubmitting: state.isSubmitting,
});

export const SubmitButton = () => {
  const { submitPipeline, isSubmitting } = useStore(selector);

  return (
    <div className="submit-shell">
      <button
        className="submit-button"
        type="button"
        onClick={submitPipeline}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Analyzing Pipeline...' : 'Submit Pipeline'}
      </button>
    </div>
  );
};
