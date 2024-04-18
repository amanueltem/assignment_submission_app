import {useLocalState} from "../util/UseLocalStorage";
import ajax from "../services/fetchService"
import {Navigate} from "react-router-dom";
import {useState} from "react"
import {useUser} from "../UserProvider/index"
const PrivateRoute=({children})=>{
   const user=useUser();
  //const [jwt,setJwt]=useLocalState("","jwt");
  const[isValid,setIsValid]=useState(false);
  const[isLoading,setIsLoading]=useState(true);
  if(user){
  ajax(`/api/auth/validate?token=${user.jwt}`,"get",user.jwt)
  .then((isValidated)=>
  {
  setIsLoading(false);
  setIsValid(isValidated);
  });
  }
  else{
  setIsValid(false);
   return <Navigate to="/login"/>
}
 return  isLoading ? (<div>Loading...</div>)
 :(isValid ? children : <Navigate to="/login"/>)
}
export default PrivateRoute;
