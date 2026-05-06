import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './context/WebSocketContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import Processes from './views/Processes';
import Security from './views/Security';
import Insights from './views/Insights';
import Settings from './views/Settings';
import { AnimatePresence } from 'framer-motion';

function App() {
    return (
        <WebSocketProvider>
            <Router>
                <div className="flex min-h-screen bg-[#020617]">
                    <Sidebar />
                    <div className="flex-1 flex flex-col transition-all duration-300">
                        <Navbar />
                        <main className="flex-1 ml-[80px] lg:ml-[260px] overflow-y-auto">
                            <AnimatePresence mode="wait">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/processes" element={<Processes />} />
                                    <Route path="/security" element={<Security />} />
                                    <Route path="/insights" element={<Insights />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Routes>
                            </AnimatePresence>
                        </main>
                    </div>
                </div>
            </Router>
        </WebSocketProvider>
    );
}

export default App;
