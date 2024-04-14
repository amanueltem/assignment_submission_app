package com.coderscampus.AssignmentSubmissionApp.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.coderscampus.AssignmentSubmissionApp.domain.Assignment;
import com.coderscampus.AssignmentSubmissionApp.domain.User;
import com.coderscampus.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import com.coderscampus.AssignmentSubmissionApp.enums.AuthorityEnum;
import com.coderscampus.AssignmentSubmissionApp.service.AssignmentService;
import com.coderscampus.AssignmentSubmissionApp.service.UserService;
import com.coderscampus.AssignmentSubmissionApp.util.AuthorityUtil;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin("http://localhost:3000")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        // load assignments if you 're code reviewer
        
        return ResponseEntity.ok(assignmentService.findByUser(user));
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        
        
        return ResponseEntity.ok(new AssignmentResponseDto(assignmentOpt.orElse(new Assignment())));
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
            @RequestBody Assignment assignment,
            @AuthenticationPrincipal User user) {
        //Add reviewer to the Assignment if it was claimed
        if(assignment.getCodeReviewer()!=null){
            User codeReviewer= assignment.getCodeReviewer();
            codeReviewer=userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
            }
        }
       Assignment updatedaAssignment= assignmentService.save(assignment);
       return ResponseEntity.ok(updatedaAssignment);
    }
}
