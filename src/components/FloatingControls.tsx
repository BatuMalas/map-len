import React from 'react';
import { useMap } from './map/MapContext';

export const FloatingControls: React.FC = () => {
    const { map } = useMap();

    const handleZoomIn = () => {
        const view = map?.getView();
        const zoom = view?.getZoom();
        if (view && zoom !== undefined) {
            view.animate({ zoom: zoom + 1, duration: 250 });
        }
    };

    const handleZoomOut = () => {
        const view = map?.getView();
        const zoom = view?.getZoom();
        if (view && zoom !== undefined) {
            view.animate({ zoom: zoom - 1, duration: 250 });
        }
    };

    return (
        <>
            {/* Map Controls (Zoom) - Top Left */}
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-auto">
                <button onClick={handleZoomIn} className="flex items-center justify-center w-10 h-10 bg-[#1c2127] rounded-lg shadow-lg hover:bg-[#283039] transition-colors border border-white/10 group">
                    <span className="material-symbols-outlined text-white text-[20px] group-active:scale-90 transition-transform">add</span>
                </button>
                <button onClick={handleZoomOut} className="flex items-center justify-center w-10 h-10 bg-[#1c2127] rounded-lg shadow-lg hover:bg-[#283039] transition-colors border border-white/10 group">
                    <span className="material-symbols-outlined text-white text-[20px] group-active:scale-90 transition-transform">remove</span>
                </button>
            </div>

            {/* Scale Line Simulation - Bottom Left */}
            <div className="absolute bottom-6 left-6 z-10 bg-[#1c2127]/80 px-2 py-1 rounded text-xs text-[#9dabb9] border border-white/5 backdrop-blur-sm">
                20 km
            </div>

            {/* Floating Action Button (FAB) - Bottom Right */}
            <div className="absolute bottom-6 right-6 z-30 pointer-events-auto">
                <button className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-[0_4px_14px_0_rgba(19,127,236,0.39)] hover:shadow-[0_6px_20px_rgba(19,127,236,0.5)] hover:bg-blue-600 active:scale-95 transition-all duration-300 group">
                    <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform duration-300">layers</span>
                </button>
            </div>
        </>
    );
};
