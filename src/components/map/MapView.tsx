import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { useMap } from './MapContext';
import 'ol/ol.css';

export const MapView: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const { setMap } = useMap();

    useEffect(() => {
        if (!mapRef.current) return;

        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([106.816666, -6.200000]), // Jakarta
                zoom: 10,
            }),
            controls: [] // Remove default controls for cleaner look if requested, or keep defaults
        });

        setMap(initialMap);

        return () => {
            initialMap.setTarget(undefined);
        };
    }, [setMap]);

    return (
        <div ref={mapRef} className="absolute inset-0 w-full h-full" />
    );
};
