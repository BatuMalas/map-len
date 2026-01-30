import { useState } from 'react';

const ToolsPanel: React.FC = () => {
    const [conversionMode, setConversionMode] = useState<'dms-to-decimal' | 'decimal-to-dms'>('dms-to-decimal');

    return (
        <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] z-20 p-4 sm:p-6 flex flex-col pointer-events-none">
            <div className="glass-panel w-full flex-1 rounded-xl border border-white/10 shadow-2xl flex flex-col pointer-events-auto overflow-hidden relative">
                {/* Header */}
                <div className="p-6 pb-4 border-b border-white/10 flex-none">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                <span className="material-symbols-outlined text-[24px]">calculate</span>
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-white leading-none">Map-Len Tools</h3>
                        </div>
                        <button className="text-[#9dabb9] hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
                    {/* Segmented Control Tabs */}
                    <div className="flex p-1 bg-[#111418] rounded-lg border border-white/5">
                        <label className="flex-1 relative cursor-pointer group">
                            <input
                                type="radio"
                                name="conversion-type"
                                value="dms-to-decimal"
                                checked={conversionMode === 'dms-to-decimal'}
                                onChange={() => setConversionMode('dms-to-decimal')}
                                className="peer sr-only"
                            />
                            <div className="flex items-center justify-center py-2.5 px-4 rounded-[6px] text-sm font-medium text-[#9dabb9] peer-checked:bg-[#283039] peer-checked:text-white peer-checked:shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:text-white transition-all duration-200">
                                DMS to Decimal
                            </div>
                        </label>
                        <label className="flex-1 relative cursor-pointer group">
                            <input
                                type="radio"
                                name="conversion-type"
                                value="decimal-to-dms"
                                checked={conversionMode === 'decimal-to-dms'}
                                onChange={() => setConversionMode('decimal-to-dms')}
                                className="peer sr-only"
                            />
                            <div className="flex items-center justify-center py-2.5 px-4 rounded-[6px] text-sm font-medium text-[#9dabb9] peer-checked:bg-[#283039] peer-checked:text-white peer-checked:shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:text-white transition-all duration-200">
                                Decimal to DMS
                            </div>
                        </label>
                    </div>

                    {/* Latitude Section */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-white text-base font-bold leading-tight tracking-wide flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full"></span>
                            LATITUDE
                        </h2>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Deg °</label>
                                <input type="number" placeholder="40" className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Min '</label>
                                <input type="number" placeholder="26" className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Sec "</label>
                                <input type="number" placeholder="46" className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Dir</label>
                                <div className="relative">
                                    <select className="w-full bg-[#1c2127] border border-white/10 rounded-lg pl-3 pr-8 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer transition-all hover:bg-[#283039]">
                                        <option>N</option>
                                        <option>S</option>
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
                                <input type="number" placeholder="79" className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Min '</label>
                                <input type="number" placeholder="58" className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Sec "</label>
                                <input type="number" placeholder="56" className="w-full bg-[#1c2127] border border-white/10 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e5d6d] transition-all" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-1">
                                <label className="text-[10px] text-[#9dabb9] font-medium uppercase tracking-wider pl-1">Dir</label>
                                <div className="relative">
                                    <select className="w-full bg-[#1c2127] border border-white/10 rounded-lg pl-3 pr-8 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer transition-all hover:bg-[#283039]">
                                        <option>W</option>
                                        <option>E</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#9dabb9]">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/5"></div>

                    {/* Result Display */}
                    <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-3 opacity-20">
                            <span className="material-symbols-outlined text-[64px] text-primary">public</span>
                        </div>
                        <div className="flex justify-between items-center relative z-10">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Calculated Decimal</span>
                            <button className="text-[#9dabb9] hover:text-white transition-colors flex items-center gap-1 group" title="Copy to clipboard">
                                <span className="text-xs group-hover:underline">Copy</span>
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                            </button>
                        </div>
                        <div className="font-mono text-2xl sm:text-3xl text-white tracking-tight relative z-10 font-medium">
                            40.446, -79.982
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-2 pb-6 border-t border-white/5 bg-[#101922]/50 flex-none">
                    <div className="flex gap-3">
                        <button className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
                            Add to Map
                        </button>
                        <button className="flex-none w-24 bg-transparent border border-white/20 hover:bg-white/5 text-[#9dabb9] hover:text-white font-medium py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] hover:border-white/30">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsPanel;
