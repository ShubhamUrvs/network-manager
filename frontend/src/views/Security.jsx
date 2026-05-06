import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Fingerprint, Construction } from 'lucide-react';

const Security = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 h-full flex flex-col items-center justify-center text-center space-y-6"
        >
            <div className="p-8 bg-purple-500/10 rounded-full border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                <ShieldAlert size={80} className="text-purple-500" />
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">Security Deep-Scan</h1>
                <p className="text-slate-400 max-w-md mx-auto font-medium">Advanced threat detection and anomalous connection analysis is coming soon to your dashboard.</p>
            </div>
            
            <div className="flex gap-4">
                <div className="px-4 py-2 glass-morphism rounded-xl flex items-center gap-2">
                    <Lock size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Encrypted</span>
                </div>
                <div className="px-4 py-2 glass-morphism rounded-xl flex items-center gap-2">
                    <Fingerprint size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Multi-factor</span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl">
                <Construction size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Under Construction</span>
            </div>
        </motion.div>
    );
};

export default Security;
