package com.network.manager.controllers;

import com.network.manager.models.Metric;
import com.network.manager.repositories.MetricRepository;
import com.network.manager.services.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
public class MetricsController {

    @Autowired
    private MetricsService metricsService;

    @Autowired
    private MetricRepository metricRepository;

    @PostMapping
    public void receiveMetrics(@RequestBody Metric metric) {
        metricsService.saveAndBroadcast(metric);
    }

    @GetMapping("/history")
    public List<Metric> getHistory() {
        return metricRepository.findAll();
    }
}
