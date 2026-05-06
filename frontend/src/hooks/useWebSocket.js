import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const useWebSocket = (url, topics) => {
    const [messages, setMessages] = useState({});
    const stompClient = useRef(null);

    useEffect(() => {
        const socket = new SockJS(url);
        stompClient.current = Stomp.over(socket);
        stompClient.current.debug = null; // Disable logging

        stompClient.current.connect({}, () => {
            console.log("Connected to WebSocket at " + url);
            topics.forEach(topic => {
                stompClient.current.subscribe(topic, (message) => {
                    const payload = JSON.parse(message.body);
                    console.log(`Received message on ${topic}:`, payload);
                    setMessages(prev => ({
                        ...prev,
                        [topic]: payload
                    }));
                });
            });
        }, (error) => {
            console.error("STOMP Error: ", error);
        });

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        };
    }, [url, JSON.stringify(topics)]);

    return messages;
};
