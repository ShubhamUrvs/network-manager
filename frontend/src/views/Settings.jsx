import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Sliders, Bell, Globe, Construction } from 'lucide-react';

const Settings = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 h-full flex flex-col items-center justify-center text-center space-y-6"
        >
            <div className="p-8 bg-slate-500/10 rounded-full border border-slate-500/20 shadow-[0_0_50px_rgba(148,163,184,0.1)]">
                <SettingsIcon size={80} className="text-slate-400" />
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">System Settings</h1>
                <p className="text-slate-400 max-w-md mx-auto font-medium">Configure alert thresholds, data retention policies, and agent synchronization intervals.</p>
            </div>
            
            <div className="flex gap-4">
                <div className="p-4 glass-morphism rounded-2xl">
                    <Sliders size={20} className="text-slate-600" />
                </div>
                <div className="p-4 glass-morphism rounded-2xl">
                    <Bell size={20} className="text-slate-600" />
                </div>
                <div className="p-4 glass-morphism rounded-2xl">
                    <Globe size={20} className="text-slate-600" />
                </div>
            </div>

            <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl">
                <Construction size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Under Construction</span>
            </div>
        </motion.div>
    );
};

export default Settings;
