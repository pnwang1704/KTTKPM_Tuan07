package com.example.bookingservice.controller;

import com.example.bookingservice.model.Booking;
import com.example.bookingservice.repository.BookingRepository;
import com.example.common.event.BookingCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@Slf4j
public class BookingController {

    private final BookingRepository bookingRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private static final String TOPIC = "booking_created";

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public String createBooking(@RequestBody Booking booking) {
        log.info("Creating booking for user {} on movie {}", booking.getUserId(), booking.getMovieId());
        
        booking.setStatus("PENDING");
        booking.setAmount(50.0); // Simple fixed amount
        Booking savedBooking = bookingRepository.save(booking);

        BookingCreatedEvent event = BookingCreatedEvent.builder()
                .eventId(BookingCreatedEvent.generateId())
                .timestamp(LocalDateTime.now())
                .bookingId(savedBooking.getId())
                .userId(savedBooking.getUserId())
                .movieId(savedBooking.getMovieId())
                .amount(savedBooking.getAmount())
                .seatNumber(savedBooking.getSeatNumber())
                .build();

        log.info("Publishing BOOKING_CREATED event: {}", event.getEventId());
        kafkaTemplate.send(TOPIC, event);

        return "Booking created with ID: " + savedBooking.getId() + ". Waiting for payment...";
    }
}
