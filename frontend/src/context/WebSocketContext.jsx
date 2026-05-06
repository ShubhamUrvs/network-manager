import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const stompClient = useRef(null);
    const topics = ['/topic/metrics', '/topic/processes', '/topic/alerts'];
    const url = 'http://localhost:8081/ws';

    useEffect(() => {
        const socket = new SockJS(url);
        stompClient.current = Stomp.over(socket);
        stompClient.current.debug = null;

        stompClient.current.connect({}, () => {
            setIsConnected(true);
            topics.forEach(topic => {
                stompClient.current.subscribe(topic, (message) => {
                    const payload = JSON.parse(message.body);
                    setMessages(prev => ({
                        ...prev,
                        [topic]: payload
                    }));
                });
            });
        }, (error) => {
            console.error("WebSocket Connection Error:", error);
            setIsConnected(false);
        });

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ messages, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketData = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocketData must be used within a WebSocketProvider");
    }
    return context;
};
