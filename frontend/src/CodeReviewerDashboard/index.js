import { useLocalState } from "../util/UseLocalStorage";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ajax from "../services/fetchService"
import {jwtDecode} from 'jwt-decode'
import StatusBadge from "../StatusBadge/index"
import {useNavigate} from "react-router-dom"
import { Button, Card ,Badge,Row,Col,Container} from "react-bootstrap"
import {useUser} from "../UserProvider/index"
const CodeReviewerDashboard = () => {
    const user=useUser();
    //const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        ajax("/api/assignments", "GET", user.jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        }).catch((message) => console.log(message));
    }, [])
    const createAssignment = () => {
        ajax("/api/assignments", "POST", user.jwt).then(
            (assignment) => {
                navigate(`/assignments/${assignment.id}`);
            }
        ).catch((message) => alert(message));
    };
    
    const claimAssignment=(assignment)=>{
       const decodedJwt=jwtDecode(user.jwt);
       const codeReviewer={
       username:decodedJwt.sub,
       }
       assignment.codeReviewer=codeReviewer;
       assignment.status="In Review";
       console.log(assignment.id);
    ajax(`/api/assignments/${assignment.id}`,"PUT",user.jwt,assignment).then(updatedAssignment=>{
           //update the view for the assignment that changed
           const assignmentsCopy=[...assignments]
           const i=assignmentsCopy.findIndex(a=>a.id===assignment.id)
           assignmentsCopy[i]=updatedAssignment;
           setAssignments(assignmentsCopy);
           });
    }
    
    const editReview=(assignment)=>{
      navigate(`/assignments/${assignment.id}`);
      console.log("editReview");
    }

    return (
        <Container>
        <Row>
          <Col>
              <div 
              className="d-flex justify-content-end"
              style={{cursor:"pointer"}}
               onClick={(e)=>{
                  user.setJwt(null);
                  navigate("/login");
               }}>
                 Logout
              </div>
          </Col>
        </Row>
        <Row>
         <Col>
             <div className="h1"> Code Reviewer Dashboard</div>
         </Col>
        </Row>
        <div className="assignment-wrapper in-review">
             <div 
          className="h3 px-2 assignment-wrapper-title" 
          >
          In Review
          </div>
           {assignments && assignments.filter((assignment)=>assignment.status==="In Review").length>0 ? (
                <div className="d-grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>{
                        assignments
                        .filter((assignment)=>assignment.status==="In Review").map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={assignment.status}/>
                                    </div>
                                    <Card.Text Sstyle={{ marginTop: "1em" }}>
                                        <p><b>GitHub Url</b>: {assignment.githubUrl}</p>
                                        <p><b>Branch</b>: {assignment.branch}</p>
                                    </Card.Text>

                                    <Button variant="secondary" onClick={(e) => {
                                        editReview(assignment)
                                    }}>
                                        Edit
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : (
                 <div>
                 No assignments Found!
                 </div>
                )}
        </div>
        
        
        
        
        
        
        <div className="assignment-wrapper  submitted">
          <div 
          className="h3 px-2 assignment-wrapper-title" 
          >
          Awaiting Review
          </div>
          {assignments  && assignments.filter((assignment)=>assignment.status==="Submitted"||
                                                            assignment.status==="Resubmitted").length>0 ? (
                <div className="d-grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>{
                        assignments
                        .filter((assignment)=>
                        assignment.status==="Submitted"||
                        assignment.status==="Resubmitted")
                        .sort((a,b)=>{
                           if(a.status==="Resubmitted"){
                              return -1;
                           }
                           else{
                             return 1;
                             
                           }
                        }
                        ).map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={assignment.status}/>
                                    </div>
                                    <Card.Text Sstyle={{ marginTop: "1em" }}>
                                        <p><b>GitHub Url</b>: {assignment.githubUrl}</p>
                                        <p><b>Branch</b>: {assignment.branch}</p>
                                    </Card.Text>

                                    <Button variant="secondary" onClick={(e) => {
                                        claimAssignment(assignment)
                                    }}>
                                        Claim
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : 
                (
                <div>
                No assignments found!
                </div>)}
        </div>
        
        
        
        
        
        <div className="assignment-wrapper  submitted">
          <div 
          className="h3 px-2 assignment-wrapper-title" 
          >
          Needs Update
          </div>
          {assignments && assignments.filter((assignment)=>assignment.status==="Needs Update").length>0 ? (
                <div className="d-grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>{
                        assignments
                        .filter((assignment)=>assignment.status==="Needs Update").map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={assignment.status}/>
                                    </div>
                                    <Card.Text Sstyle={{ marginTop: "1em" }}>
                                        <p><b>GitHub Url</b>: {assignment.githubUrl}</p>
                                        <p><b>Branch</b>: {assignment.branch}</p>
                                    </Card.Text>

                                    <Button variant="secondary" onClick={(e) => {
                                         navigate(`/assignments/${assignment.id}`)
                                    }}>
                                        View
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) :(
                 <div>
                  No assignments found!
                 </div>
                )}
        </div>
        
            
        </Container>
    );
};

export default CodeReviewerDashboard;

