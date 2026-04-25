package com.example.common.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public abstract class BaseEvent {
    private String eventId;
    private LocalDateTime timestamp;

    public static String generateId() {
        return UUID.randomUUID().toString();
    }
}
