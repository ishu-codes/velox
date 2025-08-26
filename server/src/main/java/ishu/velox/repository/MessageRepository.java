package ishu.velox.repository;

import ishu.velox.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<ChatMessage, String> {
}
