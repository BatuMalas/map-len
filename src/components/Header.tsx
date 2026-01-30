import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] bg-[#111418]/95 backdrop-blur px-6 py-3 shadow-md">
            <div className="flex items-center gap-4 text-white">
                <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                    <span className="material-symbols-outlined">map</span>
                </div>
                <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-display">Map-Len</h2>
            </div>
            <div className="hidden md:flex flex-1 justify-center gap-8">
                <a className="text-primary font-bold text-sm leading-normal border-b-2 border-primary pb-0.5" href="#">Decimal to DMS</a>
                <a className="text-[#9dabb9] hover:text-white transition-colors text-sm font-medium leading-normal" href="#">DMS to Decimal</a>
                <a className="text-[#9dabb9] hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Batch Convert</a>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3">
                    <button className="text-[#9dabb9] hover:text-white">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button className="text-[#9dabb9] hover:text-white">
                        <span className="material-symbols-outlined">help</span>
                    </button>
                </div>
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-[#3b4754]"
                    data-alt="User profile avatar"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGg8axzGsz1B-Mr6vYMbDmygCQvxbYPrVA8a9gHvwom8HyiMxwcOVomSJBzH6zILfEE7r7yvTuvPtqKAROYxOT6SDDbbF7234G751m6tBW63shQRWpGoKREjFqa0L-CJ7qDXdiktfLICACythNv3w5Ql5TP3ka5Pznh4CeT9hdzWXeaRwz64sgfpZpJYjrXI2bMdaRgMu-kGWPBJe9GUMrrr07YkjFVjBPctPkJQsRBi5Vt9etRgC93AtKqZ4yXs3Kt5C-PEXS2Urf")' }}>
                </div>
            </div>
        </header>
    );
};
