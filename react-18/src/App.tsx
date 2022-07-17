import { AutoBatch } from './Autobatch';
import { SuspenseContainer } from './SuspenseContainer';
import { TransitionContainer } from './TransitionContainer';

function App() {
  return (
    <div className="App">
      <AutoBatch />
      <SuspenseContainer />
      <TransitionContainer />
    </div>
  );
}

export default App;
