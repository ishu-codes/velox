package ishu.velox.repository;

import ishu.velox.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findByGroup_Id(String groupId);
}
