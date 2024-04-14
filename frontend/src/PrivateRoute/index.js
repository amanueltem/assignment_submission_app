import {useLocalState} from "../util/UseLocalStorage";
import ajax from "../services/fetchService"
import {Navigate} from "react-router-dom";
import {useState} from "react"
const PrivateRoute=({children})=>{
  const [jwt,setJwt]=useLocalState("","jwt");
  const[isValid,setIsValid]=useState(false);
  const[isLoading,setIsLoading]=useState(true);
  if(jwt){
  ajax(`/api/auth/validate?token=${jwt}`,"get",jwt)
  .then((isValidated)=>
  {
  setIsLoading(false);
  setIsValid(isValidated);
  });
  }
  else{
   return <Navigate to="/login"/>
}
 return  isLoading ? (<div>Loading...</div>)
 :(isValid ? children : <Navigate to="/login"/>)
}
export default PrivateRoute;
