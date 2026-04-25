package com.example.common.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BookingCreatedEvent extends BaseEvent {
    private Long bookingId;
    private Long userId;
    private Long movieId;
    private Double amount;
    private String seatNumber;
}
