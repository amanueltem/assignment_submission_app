package com.coderscampus.AssignmentSubmissionApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.AssignmentSubmissionApp.domain.Comment;
import com.coderscampus.AssignmentSubmissionApp.domain.User;
//import com.coderscampus.AssignmentSubmissionApp.dto.CommentDto;
import com.coderscampus.AssignmentSubmissionApp.service.CommentService;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping("")
    public ResponseEntity<?> createComment(@RequestBody Comment comment,@AuthenticationPrincipal User user){
        comment.setCreatedBy(user);
        comment.setCreatedDate(LocalDateTime.now());
        return ResponseEntity.ok(commentService.save(comment));
    }
    @PutMapping("{commentId}")
    public ResponseEntity<?> updateComment(@RequestBody Comment comment){
        return ResponseEntity.ok(commentService.save(comment));
    }
    @DeleteMapping("{commentId}")
public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
    // Assuming you have a service method to delete the comment by its ID
    commentService.delete(commentId);
    return ResponseEntity.ok().build();
}

    @GetMapping("")
    public ResponseEntity<?> getCommentsByAssignment(@RequestParam Long assignmentId){
        return ResponseEntity.ok(commentService.getCommentsByAssignmentId(assignmentId));
    }
}
