package com.coderscampus.AssignmentSubmissionApp.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Assignment assignment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private LocalDateTime createdDate;
    @Column(columnDefinition = "TEXT")
    private String text;
    

    // setsrs
    public void setId(Long id) {
        this.id = id;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    // getters
    public Long getId() {
        return id;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public String getText() {
        return text;
    }

    public Assignment getAssignment() {
        return assignment;
    }
}
