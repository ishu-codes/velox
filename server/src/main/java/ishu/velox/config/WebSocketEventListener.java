package ishu.velox.config;

import ishu.velox.chat.MessageType;
import ishu.velox.model.ChatMessage;
import ishu.velox.model.User;
import ishu.velox.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Collections;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {
    private final SimpMessageSendingOperations messageTemplate;

    @Autowired
    UserRepository userRepository;

    @EventListener
    void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String groupId = (String) headerAccessor.getSessionAttributes().get("groupId");

        User user = userRepository.findById(username).orElseGet(() -> userRepository.save(
                User.builder()
                        .id(username)
                        .name(getName(username))
                        .build()
        ));

        if (username != null && groupId != null) {
            log.info("User connected: {}", username);
            ChatMessage chatMessage = ChatMessage.builder()
                    .type(MessageType.JOIN)
                    .sender(user)
                    .build();
            messageTemplate.convertAndSend("/topic/" + groupId + "/public", chatMessage);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String groupId = (String) headerAccessor.getSessionAttributes().get("groupId");

        User user = userRepository.findById(username).orElseGet(() -> userRepository.save(
                User.builder()
                        .id(username)
                        .name(getName(username))
                        .build()
        ));

        if (username != null && groupId != null) {
            log.info("User disconnected: {}", username);
            ChatMessage chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .sender(user)
                    .build();
            messageTemplate.convertAndSend("/topic/" + groupId + "/public", chatMessage);
        }
    }

    private String getName(String username) {
        String[] words = username.split("-");
        String firstName = new String("" + words[0].charAt(0)).toUpperCase() + words[0].substring(1);
        String lastName = new String("" + words[1].charAt(0)).toUpperCase() + words[1].substring(1);
        return firstName + " " + lastName;
    }
}
