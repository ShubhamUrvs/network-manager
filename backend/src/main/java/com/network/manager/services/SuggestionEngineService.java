package com.network.manager.services;

import com.network.manager.models.Metric;
import com.network.manager.models.Suggestion;
import com.network.manager.repositories.SuggestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SuggestionEngineService {

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void evaluate(Metric metric) {
        if (metric.getPing() != null) {
            if (metric.getPing() > 200) {
                createSuggestion("High latency detected (>200ms). Consider switching to a wired connection or checking your router.", "RED");
            } else if (metric.getPing() > 100) {
                createSuggestion("Moderate latency detected (>100ms). Close background downloads.", "YELLOW");
            }
        }

        if (metric.getPacketLoss() != null && metric.getPacketLoss() > 5.0) {
            createSuggestion("Significant packet loss detected (>5%). Check your ISP connection.", "RED");
        }
        
        if (metric.getJitter() != null && metric.getJitter() > 50) {
            createSuggestion("High jitter detected. This may cause stuttering in video calls or gaming.", "YELLOW");
        }
    }

    private void createSuggestion(String message, String severity) {
        Suggestion suggestion = new Suggestion();
        suggestion.setMessage(message);
        suggestion.setSeverity(severity);
        suggestion.setCreatedAt(LocalDateTime.now());
        
        suggestionRepository.save(suggestion);
        
        // Broadcast alert
        messagingTemplate.convertAndSend("/topic/alerts", suggestion);
    }
}
