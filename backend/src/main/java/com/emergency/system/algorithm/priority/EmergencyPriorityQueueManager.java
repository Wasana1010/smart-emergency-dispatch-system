package com.emergency.system.algorithm.priority;

import com.emergency.system.entity.Emergency;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

@Component
public class EmergencyPriorityQueueManager {

    private final PriorityQueue<Emergency> minHeap;

    public EmergencyPriorityQueueManager() {
        // Initialize PriorityQueue with our custom comparator
        this.minHeap = new PriorityQueue<>(new EmergencyComparator());
    }

    // Add an emergency to the heap
    public void insert(Emergency emergency) {
        if (emergency != null) {
            minHeap.offer(emergency);
        }
    }

    // Extract the highest priority emergency
    public Emergency pollNext() {
        return minHeap.poll();
    }

    // Return all elements in sorted order without destroying the heap
    public List<Emergency> getSortedQueueSnapshot() {
        // Create a copy to avoid mutating the live heap during a read
        PriorityQueue<Emergency> copy = new PriorityQueue<>(minHeap);
        List<Emergency> sortedList = new ArrayList<>();
        while (!copy.isEmpty()) {
            sortedList.add(copy.poll());
        }
        return sortedList;
    }

    public void clear() {
        minHeap.clear();
    }
}