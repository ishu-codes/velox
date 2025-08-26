package ishu.velox.chat;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String id;
    private String content;
    private String sender;
    private MessageType type;
    private String timestamp;
}
