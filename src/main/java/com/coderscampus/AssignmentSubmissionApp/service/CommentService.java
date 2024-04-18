package com.coderscampus.AssignmentSubmissionApp.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coderscampus.AssignmentSubmissionApp.domain.Comment;
import com.coderscampus.AssignmentSubmissionApp.repository.CommentRepository;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;
    public Comment save(Comment comment){
        return commentRepo.save(comment);
    }
    public Set<Comment> getCommentsByAssignmentId(Long assignmentId){
        
        return commentRepo.findByAssignemntId(assignmentId);
    }
    public void delete(Long commentId) {
       commentRepo.deleteById(commentId);
    }
}
