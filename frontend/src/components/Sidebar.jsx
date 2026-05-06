import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Activity, 
    ShieldAlert, 
    BarChart3, 
    Settings, 
    ChevronLeft, 
    ChevronRight,
    Zap
} from 'lucide-react';
import { cn } from '../utils/cn';

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Processes', icon: Activity, path: '/processes' },
    { name: 'Security', icon: ShieldAlert, path: '/security' },
    { name: 'Insights', icon: BarChart3, path: '/insights' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '260px' }}
            className="fixed left-0 top-0 h-full bg-[#020617]/80 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50 overflow-hidden"
        >
            <div className="p-6 flex items-center gap-4 mb-8">
                <div className="p-2 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Zap size={24} className="text-white fill-current" />
                </div>
                {!isCollapsed && (
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-bold text-xl tracking-tight text-white whitespace-nowrap"
                    >
                        NetOptima
                    </motion.span>
                )}
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                            isActive 
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        )}
                    >
                        <item.icon size={22} className={cn("transition-transform duration-300 group-hover:scale-110")} />
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-medium whitespace-nowrap"
                            >
                                {item.name}
                            </motion.span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-6 text-slate-500 hover:text-white transition-colors flex justify-center"
            >
                {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span className="text-sm font-medium">Collapse</span></div>}
            </button>
        </motion.aside>
    );
};

export default Sidebar;
