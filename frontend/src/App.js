import Dashboard from "./Dashboard/index"
import HomePage from "./HomePage/index"
import PrivateRoute from "./PrivateRoute/index"
import AssignmentView from "./AssignmentView/index"
import CodeReviewAssignmentView from "./CodeReviewAssignmentView/index"
import CodeReviewerDashboard from "./CodeReviewerDashboard/index"
import {Routes, Route } from 'react-router-dom';
import {useEffect,useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "./Login/index";
import { useLocalState } from "./util/UseLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
const App = () => {  
      const [jwt,setJwt]=useLocalState("","jwt");
   const getRoleFromJWT = () => {
   if(jwt){
    const decoded_jwt = jwtDecode(jwt);
   return decoded_jwt.authorities;
   }
        return [];
}

    const  [roles,setRoles]=useState(getRoleFromJWT());
   //console.log(roles);
   return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard" element={
          roles.find((role)=>role ==="ROLE_CODE_REVIEWER")?
          (
           <PrivateRoute>
           <CodeReviewerDashboard/>
           </PrivateRoute>
          )
          :
          (
          <PrivateRoute>
          <Dashboard/>
          </PrivateRoute>)
          } />
          <Route path="/assignments/:id" element={
          roles.find((role)=>role==="ROLE_CODE_REVIEWER") ?
          (
            <PrivateRoute>
            <CodeReviewAssignmentView/>
            </PrivateRoute>
          )
          :
          (
          <PrivateRoute>
          <AssignmentView/>
          </PrivateRoute>)
          }/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
   );
};

export default App;

