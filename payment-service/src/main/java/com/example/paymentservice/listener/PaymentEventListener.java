package com.example.paymentservice.listener;

import com.example.common.event.BookingCreatedEvent;
import com.example.common.event.BookingFailedEvent;
import com.example.common.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentEventListener {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "booking_created", groupId = "payment-group")
    public void processPayment(BookingCreatedEvent event) {
        log.info("Processing payment for booking: {}. Amount: {}", event.getBookingId(), event.getAmount());

        // Simulate payment logic (random success/fail)
        boolean isSuccess = Math.random() > 0.3; // 70% success rate

        if (isSuccess) {
            log.info("Payment SUCCESS for booking: {}", event.getBookingId());
            PaymentCompletedEvent successEvent = PaymentCompletedEvent.builder()
                    .eventId(PaymentCompletedEvent.generateId())
                    .timestamp(LocalDateTime.now())
                    .bookingId(event.getBookingId())
                    .paymentId((long) (Math.random() * 10000))
                    .status("COMPLETED")
                    .build();
            kafkaTemplate.send("payment_completed", successEvent);
        } else {
            log.warn("Payment FAILED for booking: {}", event.getBookingId());
            BookingFailedEvent failEvent = BookingFailedEvent.builder()
                    .eventId(BookingFailedEvent.generateId())
                    .timestamp(LocalDateTime.now())
                    .bookingId(event.getBookingId())
                    .reason("Insufficient funds")
                    .build();
            kafkaTemplate.send("booking_failed", failEvent);
        }
    }
}
