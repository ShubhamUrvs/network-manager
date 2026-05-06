import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, Construction } from 'lucide-react';

const Insights = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 h-full flex flex-col items-center justify-center text-center space-y-6"
        >
            <div className="p-8 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <BarChart3 size={80} className="text-blue-500" />
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">Network Insights</h1>
                <p className="text-slate-400 max-w-md mx-auto font-medium">Historical trend analysis, peak usage prediction, and ISP benchmarking is being integrated.</p>
            </div>
            
            <div className="flex gap-4">
                <div className="p-4 glass-morphism rounded-2xl">
                    <LineChart size={24} className="text-slate-600" />
                </div>
                <div className="p-4 glass-morphism rounded-2xl">
                    <PieChart size={24} className="text-slate-600" />
                </div>
            </div>

            <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl">
                <Construction size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Under Construction</span>
            </div>
        </motion.div>
    );
};

export default Insights;
