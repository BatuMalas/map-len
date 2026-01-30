import { MapBackground } from './components/MapBackground';
import { ConversionCard } from './components/ConversionCard';
import { FloatingControls } from './components/FloatingControls';
import { MapProvider } from './components/map/MapContext';

function App() {
  return (
    <MapProvider>
      <div className="bg-background-dark font-display text-white overflow-hidden h-screen w-screen relative group/design-root">
        <MapBackground />

        {/* Floating Controls (Zoom, Scale, FAB) */}
        <FloatingControls />

        {/* Sidebar Panel */}
        <ConversionCard />
      </div>
    </MapProvider>
  );
}

export default App;
