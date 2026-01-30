import React, { useState, useEffect } from 'react';
import { dmsToDD, ddToDMS, formatDMS } from '../utils/geoConverter';
import { useMap } from './map/MapContext';
import { createMarker, markerLayer, centerMap } from './map/Marker';
import { toLonLat } from 'ol/proj';

/**
 * Komponen utama untuk panel konversi koordinat.
 * Mengelola input user untuk konversi antara format Decimal Degrees (DD) dan Degrees Minutes Seconds (DMS).
 * Juga menyediakan fitur untuk menambahkan marker ke peta berdasarkan hasil konversi.
 */
export const ConversionCard: React.FC = () => {
    const { map } = useMap();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'DMS_TO_DD' | 'DD_TO_DMS'>('DMS_TO_DD');

    // State for DD Inputs
    const [ddLat, setDdLat] = useState<string>('40.446');
    const [ddLon, setDdLon] = useState<string>('-79.982');

    // State for DMS Inputs
    const [dmsLatDeg, setDmsLatDeg] = useState<string>('40');
    const [dmsLatMin, setDmsLatMin] = useState<string>('26');
    const [dmsLatSec, setDmsLatSec] = useState<string>('46');
    const [dmsLatDir, setDmsLatDir] = useState<'N' | 'S'>('N');

    const [dmsLonDeg, setDmsLonDeg] = useState<string>('79');
    const [dmsLonMin, setDmsLonMin] = useState<string>('58');
    const [dmsLonSec, setDmsLonSec] = useState<string>('56');
    const [dmsLonDir, setDmsLonDir] = useState<'E' | 'W'>('W');

    const [result, setResult] = useState<string>('');

    // Add marker layer to map on mount
    useEffect(() => {
        if (map) {
            map.addLayer(markerLayer);
        }
        return () => {
            if (map) {
                map.removeLayer(markerLayer);
            }
        }
    }, [map]);

    // Update all states from DD values
    const updateAllStatesFromDD = (lat: number, lon: number) => {
        setDdLat(lat.toFixed(6));
        setDdLon(lon.toFixed(6));

        const latDms = ddToDMS(lat, true);
        const lonDms = ddToDMS(lon, false);

        setDmsLatDeg(latDms.degrees.toString());
        setDmsLatMin(latDms.minutes.toString());
        setDmsLatSec(latDms.seconds.toString());
        setDmsLatDir(latDms.direction as 'N' | 'S');

        setDmsLonDeg(lonDms.degrees.toString());
        setDmsLonMin(lonDms.minutes.toString());
        setDmsLonSec(lonDms.seconds.toString());
        setDmsLonDir(lonDms.direction as 'E' | 'W');
    };

    // Update all states from DMS values
    const updateAllStatesFromDMS = () => {
        const lat = dmsToDD(Number(dmsLatDeg), Number(dmsLatMin), Number(dmsLatSec), dmsLatDir);
        const lon = dmsToDD(Number(dmsLonDeg), Number(dmsLonMin), Number(dmsLonSec), dmsLonDir);

        // Only update DD if valid
        if (!isNaN(lat)) setDdLat(lat.toFixed(6));
        if (!isNaN(lon)) setDdLon(lon.toFixed(6));

        return { lat, lon };
    };

    // Handle Map Click
    useEffect(() => {
        if (!map) return;

        const handleMapClick = (evt: any) => {
            const coords = toLonLat(evt.coordinate);
            const [lon, lat] = coords;

            updateAllStatesFromDD(lat, lon);
            setResult(`${formatDMS(ddToDMS(lat, true))}, ${formatDMS(ddToDMS(lon, false))}`);

            // Create marker at clicked location
            createMarker(lon, lat);

            setIsOpen(true);
            setActiveTab('DD_TO_DMS'); // Switch to DD input view as we have DD from map
        };

        map.on('singleclick', handleMapClick);

        return () => {
            map.un('singleclick', handleMapClick);
        };
    }, [map]);

    /**
     * Menangani proses konversi secara manual saat input berubah atau tombol ditekan.
     * Mengupdate state hasil konversi sesuai tab yang aktif.
     */
    const handleConvert = () => {
        if (activeTab === 'DD_TO_DMS') {
            const lat = parseFloat(ddLat);
            const lon = parseFloat(ddLon);
            if (!isNaN(lat) && !isNaN(lon)) {
                const latDms = ddToDMS(lat, true);
                const lonDms = ddToDMS(lon, false);
                setResult(`${formatDMS(latDms)}, ${formatDMS(lonDms)}`);

                // Also sync DMS inputs just in case
                setDmsLatDeg(latDms.degrees.toString());
                setDmsLatMin(latDms.minutes.toString());
                setDmsLatSec(latDms.seconds.toString());
                setDmsLatDir(latDms.direction as 'N' | 'S');

                setDmsLonDeg(lonDms.degrees.toString());
                setDmsLonMin(lonDms.minutes.toString());
                setDmsLonSec(lonDms.seconds.toString());
                setDmsLonDir(lonDms.direction as 'E' | 'W');
            } else {
                setResult('Invalid DD Input');
            }
        } else {
            const { lat, lon } = updateAllStatesFromDMS();
            setResult(`${lat}, ${lon}`);
        }
    };

    // Auto convert when inputs change
    useEffect(() => {
        // Debounce slightly or just run
        const timer = setTimeout(() => {
            handleConvert();
        }, 300);
        return () => clearTimeout(timer);
    }, [ddLat, ddLon, dmsLatDeg, dmsLatMin, dmsLatSec, dmsLatDir, dmsLonDeg, dmsLonMin, dmsLonSec, dmsLonDir, activeTab]);

    /**
     * Memusatkan peta ke lokasi hasil konversi dan menambahkan marker.
     * Menggunakan fungsi utilitas `centerMap` dan `createMarker`.
     */
    const handleLocate = () => {
        let lat: number, lon: number;

        if (activeTab === 'DD_TO_DMS') {
            lat = parseFloat(ddLat);
            lon = parseFloat(ddLon);
        } else {
            lat = dmsToDD(Number(dmsLatDeg), Number(dmsLatMin), Number(dmsLatSec), dmsLatDir);
            lon = dmsToDD(Number(dmsLonDeg), Number(dmsLonMin), Number(dmsLonSec), dmsLonDir);
        }

        if (!isNaN(lat) && !isNaN(lon) && map) {
            createMarker(lon, lat);
            centerMap(map, lon, lat);
        }
    };

    /**
     * Mereset semua input field dan hasil konversi menjadi kosong.
     */
    const handleClear = () => {
        setDdLat('');
        setDdLon('');
        setDmsLatDeg(''); setDmsLatMin(''); setDmsLatSec('');
        setDmsLonDeg(''); setDmsLonMin(''); setDmsLonSec('');
        setDmsLatDir('N');
        setDmsLonDir('E');
        setResult('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
    };

    return (
        <>
            {/* FAB Button - Only visible when closed or generally available to toggle */}
            <div className={`absolute bottom-6 right-6 z-30 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary hover:bg-blue-600 text-white rounded-full p-4 shadow-lg shadow-primary/30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-[32px]">calculate</span>
                </button>
            </div>

            {/* Main Card Modal */}
            <div className={`absolute right-0 top-0 h-full w-full sm:w-[480px] z-20 p-4 sm:p-6 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[120%]'}`}>
                <div className="glass-panel w-full flex-1 rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden relative">
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-white/10 flex-none">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                    <span className="material-symbols-outlined text-[24px]">calculate</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-white leading-none">Map-Len Tools</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[#9dabb9] hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-lg"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Scroll Area */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
                        {/* Segmented Control Tabs */}
                        <div className="flex p-1 bg-[#111418] rounded-lg border border-white/5">
                            <label className="flex-1 relative cursor-pointer group" onClick={() => setActiveTab('DMS_TO_DD')}>
                                <div className={`flex items-center justify-center py-2.5 px-4 rounded-[6px] text-sm font-medium transition-all duration-200 ${activeTab === 'DMS_TO_DD' ? 'bg-[#283039] text-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'text-[#9dabb9] hover:text-white'}`}>
                                    DMS to Decimal
                                </div>
                            </label>
                            <label className="flex-1 relative cursor-pointer group" onClick={() => setActiveTab('DD_TO_DMS')}>
                                <div className={`flex items-center justify-center py-2.5 px-4 rounded-[6px] text-sm font-medium transition-all duration-200 ${activeTab === 'DD_TO_DMS' ? 'bg-[#283039] text-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'text-[#9dabb9] hover:text-white'}`}>
                                    Decimal to DMS
                                </div>
                            </label>
                        </div>

                        {activeTab === 'DMS_TO_DD' ? (
                            <>
                                {/* Latitude Section */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-white text-base font-bold leading-tight tracking-wide flex items-center gap-2">
                                        <span className="w-1 h-4 bg-primary rounded-full"></span>
                                        LATITUDE
                                    </h2>
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Deg °</label>
                                            <input type="number" value={dmsLatDeg} onChange={e => setDmsLatDeg(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Min '</label>
                                            <input type="number" value={dmsLatMin} onChange={e => setDmsLatMin(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Sec "</label>
                                            <input type="number" value={dmsLatSec} onChange={e => setDmsLatSec(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Dir</label>
                                            <div className="relative">
                                                <select value={dmsLatDir} onChange={e => setDmsLatDir(e.target.value as any)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg pl-3 pr-8 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer transition-all hover:bg-[#283039]">
                                                    <option value="N">N</option>
                                                    <option value="S">S</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#9dabb9]">
                                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Longitude Section */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-white text-base font-bold leading-tight tracking-wide flex items-center gap-2">
                                        <span className="w-1 h-4 bg-primary rounded-full"></span>
                                        LONGITUDE
                                    </h2>
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Deg °</label>
                                            <input type="number" value={dmsLonDeg} onChange={e => setDmsLonDeg(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Min '</label>
                                            <input type="number" value={dmsLonMin} onChange={e => setDmsLonMin(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Sec "</label>
                                            <input type="number" value={dmsLonSec} onChange={e => setDmsLonSec(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Dir</label>
                                            <div className="relative">
                                                <select value={dmsLonDir} onChange={e => setDmsLonDir(e.target.value as any)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg pl-3 pr-8 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer transition-all hover:bg-[#283039]">
                                                    <option value="E">E</option>
                                                    <option value="W">W</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#9dabb9]">
                                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* DD Inputs */
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Decimal Latitude</label>
                                    <input type="number" value={ddLat} onChange={e => setDdLat(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" placeholder="-6.200" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Decimal Longitude</label>
                                    <input type="number" value={ddLon} onChange={e => setDdLon(e.target.value)} className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" placeholder="106.816" />
                                </div>
                            </div>
                        )}

                        <div className="h-px w-full bg-white/5"></div>

                        {/* Result Display */}
                        <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-3 opacity-20">
                                <span className="material-symbols-outlined text-[64px] text-primary">public</span>
                            </div>
                            <div className="flex justify-between items-center relative z-10">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{activeTab === 'DMS_TO_DD' ? 'Calculated Decimal' : 'Calculated DMS'}</span>
                                <button onClick={copyToClipboard} className="text-[#9dabb9] hover:text-white transition-colors flex items-center gap-1 group" title="Copy to clipboard">
                                    <span className="text-xs group-hover:underline">Copy</span>
                                    <span className="material-symbols-outlined text-sm">content_copy</span>
                                </button>
                            </div>
                            <div className="font-mono text-xl sm:text-2xl text-white tracking-tight relative z-10 font-medium break-all">
                                {result}
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-6 pt-2 pb-6 border-t border-white/5 bg-[#101922]/50 flex-none">
                        <div className="flex gap-3">
                            <button onClick={handleLocate} className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
                                Add to Map
                            </button>
                            <button onClick={handleClear} className="flex-none w-24 bg-transparent border border-white/20 hover:bg-white/5 text-[#9dabb9] hover:text-white font-medium py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] hover:border-white/30">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
