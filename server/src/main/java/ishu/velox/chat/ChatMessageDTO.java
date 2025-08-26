package ishu.velox.chat;

import ishu.velox.model.ChatMessage;

public record ChatMessageDTO(
        String id,
        String content,
        String sender,
        String groupId,
        String timestamp
) {
    public static ChatMessageDTO fromEntity(ChatMessage message) {
        return new ChatMessageDTO(
                message.getId(),
                message.getContent(),
                message.getSender().getId(),
                message.getGroup().getId(),   // only id, not full object
                message.getTimestamp()
        );
    }
}
