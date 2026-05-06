import React from 'react';
import { XCircle, Activity } from 'lucide-react';

const ProcessList = ({ processes }) => {
    const handleKill = async (pid) => {
        console.log("Attempting to kill PID:", pid);
        
        if (!window.confirm(`Are you sure you want to terminate process ${pid}?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8082/api/processes/kill/${pid}`, { 
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log("Server responded with status:", response.status);

            if (response.ok) {
                alert('SUCCESS: Kill signal sent to agent.');
            } else {
                alert(`SERVER ERROR: ${response.status} - ${response.statusText}`);
            }
        } catch (err) {
            console.error("NETWORK ERROR:", err);
            alert(`CONNECTION FAILED: Could not reach the backend at http://localhost:8082. \n\nError: ${err.message}`);
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl shadow-xl h-full flex flex-col">
            <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Network Heavy Processes</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-xs uppercase border-b border-slate-700/50">
                            <th className="pb-3 font-medium">Process</th>
                            <th className="pb-3 font-medium">PID</th>
                            <th className="pb-3 font-medium">Connections</th>
                            <th className="pb-3 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                        {processes.map((proc, idx) => (
                            <tr key={idx} className="group hover:bg-slate-700/20 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-800 rounded-lg">
                                            <Activity size={16} className="text-accent" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-200">{proc.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-sm text-slate-400">{proc.pid}</td>
                                <td className="py-4">
                                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                                        {proc.connections} Active
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <button 
                                        onClick={() => handleKill(proc.pid)}
                                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProcessList;
