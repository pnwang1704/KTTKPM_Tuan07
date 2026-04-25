package com.example.bookingservice.listener;

import com.example.bookingservice.model.Booking;
import com.example.bookingservice.repository.BookingRepository;
import com.example.common.event.BookingFailedEvent;
import com.example.common.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingEventListener {

    private final BookingRepository bookingRepository;

    @KafkaListener(topics = "payment_completed", groupId = "booking-group")
    public void handlePaymentCompleted(PaymentCompletedEvent event) {
        log.info("Received PAYMENT_COMPLETED for booking: {}", event.getBookingId());
        bookingRepository.findById(event.getBookingId()).ifPresent(booking -> {
            booking.setStatus("SUCCESS");
            bookingRepository.save(booking);
            log.info("Booking {} marked as SUCCESS", event.getBookingId());
        });
    }

    @KafkaListener(topics = "booking_failed", groupId = "booking-group")
    public void handleBookingFailed(BookingFailedEvent event) {
        log.info("Received BOOKING_FAILED for booking: {}. Reason: {}", event.getBookingId(), event.getReason());
        bookingRepository.findById(event.getBookingId()).ifPresent(booking -> {
            booking.setStatus("FAILED");
            bookingRepository.save(booking);
            log.info("Booking {} marked as FAILED", event.getBookingId());
        });
    }
}
