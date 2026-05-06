import React from 'react';
import { motion } from 'framer-motion';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const ChartCard = ({ title, data, dataKey, color, type = 'line' }) => {
    return (
        <div className="glass-morphism rounded-3xl p-8 border border-white/5 relative group h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Streaming</span>
                </div>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {type === 'line' ? (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis 
                                dataKey="time" 
                                stroke="#94a3b8" 
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b' }}
                            />
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b' }}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#f8fafc' }}
                                itemStyle={{ color: color }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey={dataKey} 
                                stroke={color} 
                                strokeWidth={3} 
                                dot={false}
                                animationDuration={300}
                                isAnimationActive={true}
                            />
                        </LineChart>
                    ) : (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis 
                                dataKey="time" 
                                stroke="#94a3b8" 
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey={dataKey} 
                                stroke={color} 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill={`url(#gradient-${dataKey})`} 
                                animationDuration={300}
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartCard;
