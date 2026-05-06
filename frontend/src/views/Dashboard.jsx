import React, { useState, useEffect } from 'react';
import { useWebSocketData } from '../context/WebSocketContext';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import AlertCard from '../components/AlertCard';
import { Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { messages } = useWebSocketData();
    const [metricsHistory, setMetricsHistory] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (messages['/topic/metrics']) {
            const data = messages['/topic/metrics'];
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setMetricsHistory(prev => [...prev.slice(-29), { ...data, time }]);
        }
    }, [messages['/topic/metrics']]);

    useEffect(() => {
        if (messages['/topic/alerts']) {
            setAlerts(prev => [messages['/topic/alerts'], ...prev].slice(0, 10));
        }
    }, [messages['/topic/alerts']]);

    const latest = metricsHistory[metricsHistory.length - 1] || { ping: 0, jitter: 0, packetLoss: 0 };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 space-y-8"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">System Overview</h1>
                <p className="text-slate-400 font-medium">Monitoring real-time network stability and performance metrics.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Average Latency"
                    value={latest.ping}
                    unit="ms"
                    icon={Zap}
                    color="blue"
                    trendData={metricsHistory.map(m => ({ val: m.ping }))}
                />
                <MetricCard 
                    title="Network Jitter"
                    value={latest.jitter}
                    unit="ms"
                    icon={Activity}
                    color="green"
                    trendData={metricsHistory.map(m => ({ val: m.jitter }))}
                />
                <MetricCard 
                    title="Packet Loss"
                    value={latest.packetLoss || 0}
                    unit="%"
                    icon={ShieldAlert}
                    color="rose"
                    trendData={metricsHistory.map(m => ({ val: m.packetLoss || 0 }))}
                />
                <MetricCard 
                    title="Total Connections"
                    value="124"
                    unit="Active"
                    icon={Cpu}
                    color="blue"
                    trendData={[5, 8, 4, 9, 12, 11, 15, 12].map(v => ({ val: v }))}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Charts Section */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <ChartCard 
                        title="Latency Real-time Flow"
                        data={metricsHistory}
                        dataKey="ping"
                        color="#3b82f6"
                        type="area"
                    />
                    <ChartCard 
                        title="Jitter Stability Index"
                        data={metricsHistory}
                        dataKey="jitter"
                        color="#22c55e"
                    />
                </div>

                {/* Right Panel: Alerts & Suggestions */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div className="glass-morphism rounded-3xl p-8 border border-white/5 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white tracking-tight">Live Intelligence</h3>
                            <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {alerts.length} Alerts
                            </span>
                        </div>
                        
                        <div className="space-y-4 overflow-y-auto max-h-[700px] pr-2 scrollbar-hide">
                            <AnimatePresence mode='popLayout'>
                                {alerts.length === 0 ? (
                                    <div className="text-center py-20 text-slate-500 italic">
                                        No active optimization suggestions.
                                    </div>
                                ) : (
                                    alerts.map((alert, idx) => (
                                        <AlertCard key={alert.id || idx} alert={alert} />
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
