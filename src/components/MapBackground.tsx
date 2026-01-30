import React from 'react';
import { MapView } from './map/MapView';

export const MapBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 bg-[#101922]">
            <div className="w-full h-full map-dark-filter opacity-100">
                <MapView />
            </div>
        </div>
    );
};
