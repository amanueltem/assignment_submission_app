import { useState, useEffect ,useRef} from 'react'
import { useLocalState } from "../util/UseLocalStorage";
import ajax from "../services/fetchService"
import StatusBadge from "../StatusBadge/index"
import { Button, Form, Row, Container, Col, Badge, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap"
import {useNavigate,useParams} from "react-router-dom"
import CommentContainer from "../CommentContainer/index"
import {useUser} from "../UserProvider/index"

const AssignmentView = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
   //const assignmentId=useParams(
  const navigate=useNavigate();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status:null,
  });
  //const [jwt, setJwt] = useLocalState("", "jwt");
  const user=useUser();
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses,setAssignmentStatuses]=useState([])

 
 
const previousAssignmentValue=useRef(assignment)
           
  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }
  const persist=()=>{
     ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment)
      .then((assignmentData) => {
        setAssignment(assignmentData);
      }).catch((message) => console.log(message));
  }
 function save(status){
  if(status && assignment.status !==status){
      updateAssignment("status",status);
    }
    else{
        persist();
      }
  }
  
 
  useEffect(()=>{
     if(previousAssignmentValue.current.status!==assignment.status){
       persist();
     }
     previousAssignmentValue.current=assignment;
   },[assignment]);
  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt).then((assignmentResponse) => {
      let assignmentData = assignmentResponse.assignment;
      if (assignmentData.branch === null) assignmentData.branch = "";
      if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
      //console.log(assignmentData);
      setAssignment(assignmentData);
      setAssignmentEnums(assignmentResponse.assignmentEnums)
      setAssignmentStatuses(assignmentResponse.statusEnums)
    }).catch((message) => console.log(message));
  }, [])
 
 /*
     
 */
  return (
  <Container className="mt-5">
  <h1>Status: {assignment.status}</h1>
      <Row className="d-flex align-items-center">
        <Col>
          {
            assignment.number ? (<h1>Assignment {assignment.number}</h1>) : (<></>)
          }
        </Col>

        <Col>
        <StatusBadge text={assignment.status}/>
        </Col>
      </Row>

      {
        assignment ? (<>
          <Form.Group as={Row} className="my-3" controlId="assignmentnum">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col>
              <DropdownButton
               key={assignment.number}
                as={ButtonGroup}
                variant="info"
                onSelect={(selectedElement) => {
                  updateAssignment("number", selectedElement);
                }
                }
                title={assignment.number ? `Assignment ${assignment.number}` : "Select an Assignment"}>
                {
                  assignmentEnums.map((assignmentEnum) => (

                    <Dropdown.Item
                      Key={assignmentEnum.status}
                      eventKey={assignmentEnum.assignmentNum}>
                      {assignmentEnum.assignmentNum}
                    </Dropdown.Item>
                  ))
                }
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githuburl">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control type="url"
                placeholder="https://github.com/username/reponame"
                value={assignment.githubUrl}
                onChange={(e) => updateAssignment("githubUrl", e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control type="text"
                value={assignment.branch}
                onChange={(e) => updateAssignment("branch", e.target.value)}
                placeholder="example_branch_name" />
            </Col>
          </Form.Group>
          
          {
           assignment.status==="Completed" ? 
           (<>
             <div>
               <Form.Group as={Row}
                className="d-flex align-items-center mb-3" 
                controlId="codeReviewVideoUrl">
            <Form.Label column sm="3" md="2">
              Code Review Video URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <a href={assignment.codeReviewVideoUrl}
              style={{fontWeight:"bold"}}>
               {assignment.codeReviewVideoUrl}
              </a>
            </Col>
          </Form.Group>
             </div>
           <div>
             <Button size="lg" variant="secondary" onClick={e=>navigate("/dashboard")}>
          Back
          </Button>
          </div>
           </>)
           :
           (
           assignment.status==="Pending Submission" ?
           (
          <div className="d-flex gap-5">
          <Button size="lg" onClick={(e)=>save("Submitted")}>Submit Assignment</Button>
          <Button size="lg" variant="secondary" onClick={(e)=>navigate("/dashboard")}>
          Back
          </Button>
          </div>):
           (
          <div className="d-flex gap-5">
          <Button size="lg" onClick={(e)=>save("Resubmitted")}>Resubmit Assignment</Button>
          <Button size="lg" variant="secondary" onClick={(e)=>navigate("/dashboard")}>
          Back
          </Button>
          </div>
          )
          )
          }
          
         <CommentContainer assignmentId={assignmentId}/>
         
        </>)
          :
          (<></>)
      }
    </Container>
  );
}
export default AssignmentView;
