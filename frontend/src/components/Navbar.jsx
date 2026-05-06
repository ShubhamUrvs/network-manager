import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useWebSocketData } from '../context/WebSocketContext';
import { cn } from '../utils/cn';

const Navbar = () => {
    const { isConnected } = useWebSocketData();

    return (
        <header className="h-20 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8 ml-[80px] lg:ml-[260px] transition-all duration-300">
            <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl w-96 group focus-within:border-blue-500/50 transition-all">
                <Search size={18} className="text-slate-500 group-focus-within:text-blue-400" />
                <input 
                    type="text" 
                    placeholder="Search metrics or processes..." 
                    className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-500"
                />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800">
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        isConnected ? "bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" : "bg-red-500"
                    )} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isConnected ? "Agent Live" : "Disconnected"}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]" />
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center p-0.5 shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform">
                        <div className="h-full w-full rounded-full bg-[#020617] flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
