package com.example.notificationservice.listener;

import com.example.common.event.PaymentCompletedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationEventListener {

    @KafkaListener(topics = "payment_completed", groupId = "notification-group")
    public void handlePaymentCompleted(PaymentCompletedEvent event) {
        log.info("**************************************************");
        log.info("NOTIFICATION RECEIVED: Booking #{} successful!", event.getBookingId());
        log.info("Payment reference: {}", event.getPaymentId());
        log.info("Timestamp: {}", event.getTimestamp());
        log.info("**************************************************");
    }
}
