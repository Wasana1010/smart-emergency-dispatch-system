package com.emergency.system.service;

import com.emergency.system.dto.NotificationRequest;
import com.emergency.system.dto.NotificationResponse;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Notification;
import com.emergency.system.entity.NotificationType;
import com.emergency.system.entity.User;
import com.emergency.system.repository.EmergencyRepository;
import com.emergency.system.repository.NotificationRepository;
import com.emergency.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    @Autowired private NotificationRepository notificationRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private EmergencyRepository emergencyRepository;

    public NotificationResponse createNotification(NotificationRequest req) {
        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification n = new Notification();
        n.setUser(user);
        n.setTitle(req.getTitle());
        n.setMessage(req.getMessage());
        n.setNotificationType(NotificationType.valueOf(req.getNotificationType()));

        if (req.getEmergencyId() != null) {
            Emergency emergency = emergencyRepository.findById(req.getEmergencyId())
                    .orElseThrow(() -> new RuntimeException("Emergency not found"));
            n.setEmergency(emergency);
        }

        Notification saved = notificationRepository.save(n);
        return mapToResponse(saved);
    }

    public List<NotificationResponse> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public NotificationResponse markAsRead(Long notificationId) {
        Notification n = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setIsRead(true);
        return mapToResponse(notificationRepository.save(n));
    }

    public void markAllAsRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        notifications.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(notifications);
    }

    private NotificationResponse mapToResponse(Notification n) {
        NotificationResponse res = new NotificationResponse();
        res.setId(n.getId());
        res.setUserId(n.getUser().getId());
        res.setEmergencyId(n.getEmergency() != null ? n.getEmergency().getId() : null);
        res.setTitle(n.getTitle());
        res.setMessage(n.getMessage());
        res.setNotificationType(n.getNotificationType().name());
        res.setIsRead(n.getIsRead());
        res.setCreatedAt(n.getCreatedAt());
        return res;
    }
}