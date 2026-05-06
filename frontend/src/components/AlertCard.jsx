import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const AlertCard = ({ alert }) => {
    const getStyles = (severity) => {
        switch (severity) {
            case 'RED':
                return {
                    icon: AlertCircle,
                    color: 'text-rose-500',
                    bg: 'bg-rose-500/10',
                    border: 'border-rose-500/20',
                    label: 'Critical'
                };
            case 'YELLOW':
                return {
                    icon: AlertTriangle,
                    color: 'text-amber-500',
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                    label: 'Warning'
                };
            default:
                return {
                    icon: Info,
                    color: 'text-blue-500',
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/20',
                    label: 'Info'
                };
        }
    };

    const styles = getStyles(alert.severity);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={cn(
                "p-5 rounded-2xl border flex flex-col gap-4 group transition-all hover:translate-x-1",
                styles.bg, styles.border
            )}
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className={cn("p-2 rounded-xl h-fit", styles.bg)}>
                        <styles.icon className={styles.color} size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", styles.bg, styles.color)}>
                                {styles.label}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">
                                {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-sm text-slate-200 font-medium leading-relaxed">
                            {alert.message}
                        </p>
                    </div>
                </div>
            </div>

            <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors ml-14 w-fit">
                Take Action <ChevronRight size={14} />
            </button>
        </motion.div>
    );
};

export default AlertCard;
