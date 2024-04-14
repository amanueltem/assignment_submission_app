package com.coderscampus.AssignmentSubmissionApp.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
// creates a table assignment based on the class Name
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer number;
    private String status;
    private String githubUrl;
    private String branch;
    private String codeReviewVideoUrl;
    @ManyToOne(optional = false)
    private User user;
    // to claim the assignment by code reviewer;
    @ManyToOne
    private User codeReviewer;
    // geters
    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getBranch() {
        return branch;
    }
    public Integer getNumber(){
         return number;
         }

    public String getCodeReviewVideoUrl() {
        return codeReviewVideoUrl;
    }

    public User getUser() {
        return user;
    }
    public User getCodeReviewer(){
        return codeReviewer;
    }

    // seters
    public void setId(Long id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
        this.codeReviewVideoUrl = codeReviewVideoUrl;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public void setCodeReviewer(User codeReviewer){
        this.codeReviewer=codeReviewer;
    }
    public void setNumber(Integer number){
          this.number=number;
    }
}
