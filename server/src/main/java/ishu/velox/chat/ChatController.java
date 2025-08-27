package ishu.velox.chat;

import ishu.velox.model.ChatMessage;
import ishu.velox.model.Group;
import ishu.velox.model.User;
import ishu.velox.repository.GroupRepository;
import ishu.velox.repository.MessageRepository;
import ishu.velox.repository.UserRepository;
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
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @MessageMapping("/chat/{groupId}/sendMessage")
    @SendTo("/topic/{groupId}/public")    // automatically sends to this topic
    public ChatMessageDTO sendMessage(@DestinationVariable String groupId, @Payload ChatMessage chatMessage) {
//        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String username = chatMessage.getSender().getId();
        log.info("\n\nMessage to group {}: {}\n\n", groupId, chatMessage.getContent());

        // fetch group from DB
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));
        chatMessage.setGroup(group);


        if (userRepository.findById(username).isEmpty()) {
            userRepository.save(User.builder().id(username).name(getName(username)).build());
        }
        messageRepository.save(chatMessage);
        chatMessage.getSender().setName(getName(username));
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

    private String getName(String username) {
        String[] words = username.split("-");
        String firstName = new String("" + words[0].charAt(0)).toUpperCase() + words[0].substring(1);
        String lastName = new String("" + words[1].charAt(0)).toUpperCase() + words[1].substring(1);
        return firstName + " " + lastName;
    }
}
