import {useLocalState} from "../util/UseLocalStorage";
import {useState} from 'react'
import {Container,Row,Col,Button,Form} from "react-bootstrap"
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/index";
const Login=()=>{
 const user=useUser();
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
   const sendLoginRequest=()=>{
    const reqBody={
   username:username,
   password:password,
  }
     fetch("/api/auth/login",{
   headers:{
      "Content-Type":"application/json"
   },
   method:"POST",
   body:JSON.stringify(reqBody),
  })
  .then((response)=>{
           if(response.status===200){
              return Promise.all([response.json(),response.headers])
           }
           else  return Promise.reject("Invalid login attempt")
  })
  .then(([body,headers])=>{
   user.setJwt(headers.get("authorization"))
   window.location.href="/dashboard";
   //navigate("/dashboard");
  }).catch((message)=>alert(message))
   }
   return( 
             <Container className="mt-5" >
                    <Row className="justify-content-center">
                    <Col md="8" lg="6">
                  <Form.Group className="mb-3" controlId="username">
                <Form.Label className="fs-4">Username</Form.Label>
                <Form.Control type="email"  size="lg" placeholder="joe@gmail.com" value={username} onChange={(e)=>setUsername(e.target.value)}/>
             </Form.Group>
             </Col>
             </Row>
             <Row className="justify-content-center">
                <Col md="8"  lg="6">
             <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control type="password"  size="lg" placeholder="Type in your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
             </Form.Group>
             </Col>
             </Row>
             <Row className="justify-content-center">
             <Col
                  md="8"
                  lg="6"
               className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between">
                  <Button id="submit"
                   type="button" 
                   onClick={sendLoginRequest}
                   size="lg"
                   >
                  Login</Button>
                   <Button id="submit"
                   type="button" 
                   onClick={(e)=>navigate("/")}
                   size="lg"
                   variant="secondary"
                   >
                  Exit</Button>
             </Col>
             </Row>
             </Container>
          )
}
export default Login;
