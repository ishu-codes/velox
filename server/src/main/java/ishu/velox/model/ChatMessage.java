package ishu.velox.model;

import ishu.velox.chat.MessageType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="messages")
@Data
public class ChatMessage {
    @Id
    private String id;
    private String content;

    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sender", nullable = false)
    private User sender;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    private String timestamp;
}
