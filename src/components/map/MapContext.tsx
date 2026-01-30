import React, { createContext, useContext, useState, useEffect } from 'react';
import Map from 'ol/Map';

interface MapContextType {
    map: Map | null;
    setMap: (map: Map) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

/**
 * Provider context untuk menyimpan instance peta OpenLayers.
 * Membungkus aplikasi agar peta dapat diakses dari komponen manapun.
 * 
 * @param children - Komponen anak yang akan dibungkus
 */
export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [map, setMap] = useState<Map | null>(null);

    // Ensure map is cleaned up when provider unmounts (though usually app root)
    useEffect(() => {
        return () => {
            if (map) {
                map.setTarget(undefined);
            }
        };
    }, [map]);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};

/**
 * Hook kustom untuk mengakses instance peta OpenLayers dari dalam komponen.
 * Harus digunakan di dalam komponen yang dibungkus oleh MapProvider.
 * 
 * @throws Error jika digunakan di luar MapProvider
 * @returns Object context berisi { map, setMap }
 */
export const useMap = () => {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
};
