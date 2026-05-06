package com.network.manager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

@RestController
@RequestMapping("/api/processes")
@CrossOrigin(origins = "*")
public class ProcessController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // A simple thread-safe queue to hold pending commands for the agent
    private static final ConcurrentLinkedQueue<Map<String, Object>> commandQueue = new ConcurrentLinkedQueue<>();

    @PostMapping
    public void receiveProcesses(@RequestBody List<Map<String, Object>> processes) {
        messagingTemplate.convertAndSend("/topic/processes", processes);
    }

    @PostMapping("/kill/{pid}")
    public void killProcess(@PathVariable Integer pid) {
        System.out.println("Queuing KILL request for PID: " + pid);
        Map<String, Object> command = Map.of("action", "KILL", "pid", pid);
        
        // 1. Still try WebSocket for immediate action
        messagingTemplate.convertAndSend("/topic/commands", command);
        
        // 2. Add to queue for the agent to "poll" (backup)
        commandQueue.add(command);
    }

    @GetMapping("/commands")
    public List<Map<String, Object>> getPendingCommands() {
        List<Map<String, Object>> commands = new ArrayList<>();
        while (!commandQueue.isEmpty()) {
            commands.add(commandQueue.poll());
        }
        return commands;
    }
}
