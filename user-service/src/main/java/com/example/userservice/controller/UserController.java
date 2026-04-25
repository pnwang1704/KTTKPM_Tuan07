package com.example.userservice.controller;

import com.example.common.event.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private static final String TOPIC = "user_registered";

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> userRequest) {
        log.info("Registering user: {}", userRequest.get("username"));
        
        // In a real app, save to DB here
        Long userId = (long) (Math.random() * 1000); 

        UserRegisteredEvent event = UserRegisteredEvent.builder()
                .eventId(UserRegisteredEvent.generateId())
                .timestamp(LocalDateTime.now())
                .userId(userId)
                .username(userRequest.get("username"))
                .email(userRequest.get("email"))
                .build();

        log.info("Publishing USER_REGISTERED event: {}", event.getEventId());
        kafkaTemplate.send(TOPIC, event);
        
        return "User registration processing for " + userRequest.get("username");
    }
}
