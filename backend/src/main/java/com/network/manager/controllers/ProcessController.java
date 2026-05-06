package com.network.manager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/processes")
@CrossOrigin(origins = "*")
public class ProcessController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public void receiveProcesses(@RequestBody List<Map<String, Object>> processes) {
        // Broadcast to frontend dashboard
        messagingTemplate.convertAndSend("/topic/processes", processes);
    }

    @PostMapping("/kill/{pid}")
    public void killProcess(@PathVariable Integer pid) {
        // Send command to agent via WebSocket topic
        messagingTemplate.convertAndSend("/topic/commands", Map.of("action", "KILL", "pid", pid));
    }
}
