import { useState, useEffect ,useRef} from 'react'
import { useLocalState } from "../util/UseLocalStorage";
import ajax from "../services/fetchService"
import StatusBadge from "../StatusBadge/index"
import { Button, Form, Row, Container, Col, Badge, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap"
const CodeReviewAssignmentView = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    codeReviewVideoUrl:"",
    number: null,
    status:null,
  });
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses,setAssignmentStatuses]=useState([])

const previousAssignmentValue=useRef(assignment)

  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }
  const persist=()=>{
     ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment)
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
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then((assignmentResponse) => {
      let assignmentData = assignmentResponse.assignment;
      if (assignmentData.branch === null) assignmentData.branch = "";
      if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
      if(assignmentData.codeReviewVideoUrl==null) assignmentData.codeReviewVideoUrl="";
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
          <Form.Group as={Row} className="my-3" controlId="githuburl">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control type="url"
                readOnly
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
                 readOnly
                value={assignment.branch}
                onChange={(e) => updateAssignment("branch", e.target.value)}
                placeholder="example_branch_name" />
            </Col>
          </Form.Group>
          
            <Form.Group as={Row} className="my-3" controlId="codereviewurl">
            <Form.Label column sm="3" md="2">
              Video Review URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control type="url"
                placeholder="https://screencast-o-matic.com/something"
                value={assignment.codeReviewVideoUrl}
                onChange={(e) => updateAssignment("codeReviewVideoUrl", e.target.value)} />
            </Col>
          </Form.Group>
          
          <div className="d-flex gap-5">
          { assignment.status=="Completed" ?
          (<Button size="lg"  variant="secondary" onClick={ (e)=>{save(assignmentStatuses[2].status)}}>
             Re-Claim
             </Button>):
          (
          <Button size="lg" onClick={ (e)=>{save(assignmentStatuses[4].status)}}>Complete Review</Button>
          )
          }
          {assignment.status==='Needs Update' ? 
             (<Button size="lg"  variant="secondary" onClick={ (e)=>{save(assignmentStatuses[2].status)}}>
             Re-Claim
             </Button>)
             :
             (
              <Button size="lg"  variant="danger" onClick={ (e)=>{save(assignmentStatuses[3].status)}}>Reject Assignment</Button>
             )
             }
         
          <Button size="lg" variant="secondary" onClick={e=>window.location.href="/dashboard"}>
          Back
          </Button>
          </div>
        </>)
          :
          (<></>)
      }
    </Container>
  );
}
export default CodeReviewAssignmentView;
