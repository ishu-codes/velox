package ishu.velox.controller;

import ishu.velox.model.ChatMessage;
import ishu.velox.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
public class MessageController {
    private final MessageRepository messageRepository;
    @GetMapping("/{groupId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String groupId) {
        return ResponseEntity.ok(messageRepository.findByGroup_Id(groupId));
    }
}
