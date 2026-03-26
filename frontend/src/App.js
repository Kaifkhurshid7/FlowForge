import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ResultModal } from './components/Modal';

function App() {
  return (
    <div className="app-shell">
      <div className="app-backdrop app-backdrop-one" />
      <div className="app-backdrop app-backdrop-two" />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <ResultModal />
    </div>
  );
}

export default App;
