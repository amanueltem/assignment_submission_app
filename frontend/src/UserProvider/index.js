import {useLocalState} from  "../util/UseLocalStorage"
import {createContext,useContext} from "react"
const UserContext=createContext();
 
const useUser=()=>{
  const context=useContext(UserContext);
  if(context===undefined){
      throw new Error('useUser must be used used within user provider.')
  }
  return context;
}
const UserProvider=({children})=>{
   const[jwt,setJwt]=useLocalState("","jwt");
   const value={jwt,setJwt}
   return <UserContext.Provider value={value}>
            {children}
          </UserContext.Provider>
}




export {UserProvider,useUser};
