package com.network.manager.services;

import com.network.manager.models.Metric;
import com.network.manager.repositories.MetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MetricsService {

    @Autowired
    private MetricRepository metricRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private SuggestionEngineService suggestionEngine;

    public void saveAndBroadcast(Metric metric) {
        metric.setCreatedAt(LocalDateTime.now());
        metricRepository.save(metric);

        // Broadcast to WebSockets
        System.out.println("Broadcasting metrics: " + metric);
        messagingTemplate.convertAndSend("/topic/metrics", metric);

        // Run Suggestion Engine
        suggestionEngine.evaluate(metric);
    }
}
