import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const AlertPanel = ({ alerts }) => {
    const getIcon = (severity) => {
        switch (severity) {
            case 'RED': return <AlertCircle className="text-red-500" />;
            case 'YELLOW': return <AlertTriangle className="text-yellow-500" />;
            case 'GREEN': return <CheckCircle className="text-green-500" />;
            default: return null;
        }
    };

    const getBgColor = (severity) => {
        switch (severity) {
            case 'RED': return 'bg-red-500/10 border-red-500/20';
            case 'YELLOW': return 'bg-yellow-500/10 border-yellow-500/20';
            case 'GREEN': return 'bg-green-500/10 border-green-500/20';
            default: return 'bg-slate-800/50';
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl shadow-xl h-full overflow-hidden flex flex-col">
            <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Optimization Suggestions</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
                {alerts.length === 0 && (
                    <div className="text-gray-500 text-center py-10 italic">
                        No alerts detected. Everything looks good!
                    </div>
                )}
                {alerts.map((alert, idx) => (
                    <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl border ${getBgColor(alert.severity)} transition-all animate-in fade-in slide-in-from-right-4`}>
                        <div className="mt-1">{getIcon(alert.severity)}</div>
                        <div>
                            <p className="text-sm text-slate-200 font-medium">{alert.message}</p>
                            <span className="text-[10px] text-slate-500 uppercase mt-1 block">
                                {new Date(alert.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertPanel;
