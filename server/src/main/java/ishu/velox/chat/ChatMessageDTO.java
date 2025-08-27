package ishu.velox.chat;

import ishu.velox.model.ChatMessage;
import ishu.velox.model.Group;
import ishu.velox.model.User;

public record ChatMessageDTO(
        String id,
        String content,
        User sender,
        Group groupId,
        String timestamp
) {
    public static ChatMessageDTO fromEntity(ChatMessage message) {
        return new ChatMessageDTO(
                message.getId(),
                message.getContent(),
                message.getSender(),
                message.getGroup(),   // only id, not full object
                message.getTimestamp()
        );
    }
}
