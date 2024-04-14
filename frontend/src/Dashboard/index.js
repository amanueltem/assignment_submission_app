import { useLocalState } from "../util/UseLocalStorage";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ajax from "../services/fetchService"
import StatusBadge from "../StatusBadge/index"
import { Button, Card ,Badge,Row,Col} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        ajax("/api/assignments", "GET", jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        }).catch((message) => console.log(message));
    }, [])
    const createAssignment = () => {
        ajax("/api/assignments", "POST", jwt).then(
            (assignment) => {
                navigate(`/assignments/${assignment.id}`);
            }
        ).catch((message) => alert(message));
    };

    return (
        <div style={{ margin: "2em" }}>
        <Row>
          <Col>
              <div 
              className="d-flex justify-content-end"
              style={{cursor:"pointer"}}
               onClick={(e)=>{
                  setJwt(null);
                window.location.href="/login";
               }}>
                 Logout
              </div>
          </Col>
        </Row>
            <div className="mb-5">
                <Button size="lg" onClick={createAssignment}>Submit New Assignment</Button>
            </div>
            {assignments ? (
                <div className="d-grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}>{
                        assignments.map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={assignment.status}></StatusBadge>
                                    </div>
                                    <Card.Text Sstyle={{ marginTop: "1em" }}>
                                        <p><b>GitHub Url</b>: {assignment.githubUrl}</p>
                                        <p><b>Branch</b>: {assignment.branch}</p>
                                    </Card.Text>

                                    <Button variant="secondary" onClick={(e) => {
                                        navigate(`/assignments/${assignment.id}`)
                                    }}>
                                        Edit
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : <></>}
        </div>
    );
};

export default Dashboard;

