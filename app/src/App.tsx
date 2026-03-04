import { useDesireStore } from './store/desireStore';
import { MoodOnboarding } from './components/MoodOnboarding';

function App() {
  const { currentMood } = useDesireStore();

  return (
    <div className="w-full h-full min-h-screen bg-nocturnal-900 text-white font-sans selection:bg-gold selection:text-nocturnal-900">
      <MoodOnboarding />
    </div>
  );
}

export default App;
