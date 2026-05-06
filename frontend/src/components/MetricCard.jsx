import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { cn } from '../utils/cn';

const MetricCard = ({ title, value, unit, icon: Icon, color, trendData }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-morphism rounded-3xl p-6 relative overflow-hidden group border border-white/5 transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl bg-opacity-10", `bg-${color}-500`)}>
                    <Icon size={24} className={cn(`text-${color}-500`)} />
                </div>
                <div className="text-right">
                    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <div className="flex items-baseline justify-end gap-1">
                        <h2 className="text-3xl font-bold text-white tabular-nums tracking-tight">{value}</h2>
                        <span className="text-slate-500 text-sm font-bold">{unit}</span>
                    </div>
                </div>
            </div>

            <div className="h-16 -mx-6 -mb-6 opacity-30 group-hover:opacity-50 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                        <defs>
                            <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : '#f43f5e'} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : '#f43f5e'} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area 
                            type="monotone" 
                            dataKey="val" 
                            stroke={color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : '#f43f5e'} 
                            strokeWidth={2} 
                            fillOpacity={1} 
                            fill={`url(#color-${title})`} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            {/* Ambient Glow */}
            <div className={cn(
                "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity",
                color === 'blue' ? "bg-blue-500" : color === 'green' ? "bg-green-500" : "bg-rose-500"
            )} />
        </motion.div>
    );
};

export default MetricCard;
