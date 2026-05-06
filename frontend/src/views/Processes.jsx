import React, { useState, useEffect } from 'react';
import { useWebSocketData } from '../context/WebSocketContext';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, Activity, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils/cn';

const Processes = () => {
    const { messages } = useWebSocketData();
    const [processes, setProcesses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (messages['/topic/processes']) {
            setProcesses(messages['/topic/processes']);
        }
    }, [messages['/topic/processes']]);

    const handleKill = async (pid) => {
        if (!window.confirm(`Are you sure you want to terminate process ${pid}?`)) {
            return;
        }

        try {
            // Using 127.0.0.1:8082 to match the new backend port and avoid DNS issues
            const response = await fetch(`http://127.0.0.1:8082/api/processes/kill/${pid}`, { 
                method: 'POST',
                mode: 'cors'
            });

            if (response.ok) {
                // Soft notification could be added here instead of alert
                console.log('Kill signal sent for PID:', pid);
            } else {
                alert('Server Error: Could not request termination.');
            }
        } catch (err) {
            alert('Network Error: Ensure the agent and backend are running.');
        }
    };

    const filteredProcesses = processes.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.pid.toString().includes(searchTerm)
    );

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 space-y-8"
        >
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Process Control</h1>
                    <p className="text-slate-400 font-medium">Manage and terminate high-usage network applications.</p>
                </div>
                
                <div className="flex gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Filter by name or PID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all w-80"
                        />
                    </div>
                    <button className="p-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="glass-morphism rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/[0.02] text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                            <th className="px-8 py-5">Application Info</th>
                            <th className="px-8 py-5 text-center">PID</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5">Network Usage</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence mode='popLayout'>
                            {filteredProcesses.map((proc) => (
                                <motion.tr 
                                    layout
                                    key={proc.pid}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="group hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                                                <Activity size={20} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{proc.name}</p>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{proc.user || 'SYSTEM'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center tabular-nums font-bold text-slate-400">{proc.pid}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-green-500/80">Active Flow</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(proc.connections * 10, 100)}%` }}
                                                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                                />
                                            </div>
                                            <span className="text-sm font-bold text-white tabular-nums w-24">
                                                {proc.connections} Conns
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button 
                                            onClick={() => handleKill(proc.pid)}
                                            className="px-5 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                                        >
                                            Terminate
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredProcesses.length === 0 && (
                    <div className="py-20 text-center text-slate-500 italic">
                        No processes match your search criteria.
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Processes;
