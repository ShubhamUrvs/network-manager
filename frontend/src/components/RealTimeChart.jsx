import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RealTimeChart = ({ data, dataKey, color, title }) => {
    return (
        <div className="glass-panel p-6 rounded-2xl shadow-xl">
            <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">{title}</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis 
                            dataKey="time" 
                            stroke="#64748b" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#64748b" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: color }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey={dataKey} 
                            stroke={color} 
                            strokeWidth={3} 
                            dot={false}
                            animationDuration={300}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RealTimeChart;
