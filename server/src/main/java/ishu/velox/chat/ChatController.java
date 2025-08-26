package ishu.velox.chat;

import ishu.velox.model.ChatMessage;
import ishu.velox.model.Group;
import ishu.velox.repository.GroupRepository;
import ishu.velox.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@Slf4j
public class ChatController {
    @Autowired
    GroupRepository groupRepository;

    @Autowired
    MessageRepository messageRepository;

    @MessageMapping("/chat/{groupId}/sendMessage")
    @SendTo("/topic/{groupId}/public")    // automatically sends to this topic
    public ChatMessageDTO sendMessage(@DestinationVariable String groupId, @Payload ChatMessage chatMessage) {
        log.info("\n\nMessage to group {}: {}\n\n", groupId, chatMessage.getContent());

        // fetch group from DB
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));
        chatMessage.setGroup(group);

        messageRepository.save(chatMessage);
        return ChatMessageDTO.fromEntity(chatMessage);
    }

    @MessageMapping("/chat/{groupId}/addUser")
    @SendTo("/topic/{groupId}/public")
    public ChatMessage addUser(@DestinationVariable String groupId, @Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        log.info("\n\n{} joined group {}\n\n", chatMessage.getSender(), groupId);
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
