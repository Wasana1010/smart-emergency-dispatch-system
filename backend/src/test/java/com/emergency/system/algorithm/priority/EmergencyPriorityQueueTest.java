package com.emergency.system.algorithm.priority;

import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Priority;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EmergencyPriorityQueueTest {

    @Test
    void testPriorityOrdering() {
        EmergencyPriorityQueueManager manager = new EmergencyPriorityQueueManager();

        Emergency low = new Emergency();
        low.setId(1L);
        low.setPriority(Priority.LOW);
        low.setRequestedAt(LocalDateTime.now().minusMinutes(10));

        Emergency urgent = new Emergency();
        urgent.setId(2L);
        urgent.setPriority(Priority.URGENT);
        urgent.setRequestedAt(LocalDateTime.now());

        Emergency high = new Emergency();
        high.setId(3L);
        high.setPriority(Priority.HIGH);
        high.setRequestedAt(LocalDateTime.now().minusMinutes(5));

        manager.insert(low);
        manager.insert(urgent);
        manager.insert(high);

        List<Emergency> sorted = manager.getSortedQueueSnapshot();

        assertEquals(2L, sorted.get(0).getId()); // URGENT first
        assertEquals(3L, sorted.get(1).getId()); // HIGH second
        assertEquals(1L, sorted.get(2).getId()); // LOW last
    }
}
