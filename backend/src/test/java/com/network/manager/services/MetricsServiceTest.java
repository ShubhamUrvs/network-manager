package com.network.manager.services;

import com.network.manager.models.Metric;
import com.network.manager.repositories.MetricRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MetricsServiceTest {

    @Mock
    private MetricRepository metricRepository;

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private MetricsService metricsService;

    @Test
    public void testSaveAndBroadcast() {
        Metric metric = new Metric();
        metric.setPing(15.5);
        metric.setJitter(2.1);

        metricsService.saveAndBroadcast(metric);

        verify(metricRepository, times(1)).save(any(Metric.class));
        verify(messagingTemplate, times(1)).convertAndSend(any(String.class), any(Metric.class));
    }
}
