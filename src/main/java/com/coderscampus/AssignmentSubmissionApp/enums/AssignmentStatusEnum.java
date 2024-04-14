package com.coderscampus.AssignmentSubmissionApp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION("Pending Submission",1),
    SUBMITTED("Submitted",2),
    IN_REVIEW("In Review",3),
    NEEDS_UPDATE("Needs Update",4),
    COMPLETED("Completed",5),
    RESUBMITTED("Resubmitted",6);
    private String status;
    private int step;
    AssignmentStatusEnum(String status,int step){
        this.status=status;
        this.step=step;
    }
    public String getStatus(){
        return status;
    }
    public int getStep(){
       return step;
    }
}
