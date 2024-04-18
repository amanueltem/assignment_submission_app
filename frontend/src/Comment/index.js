import {useUser} from "../UserProvider/index"
import {jwtDecode} from "jwt-decode"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {useState,useEffect} from "react"
const Comment=(props)=>{
  const  {id,createdDate,createdBy,text,emitDeleteComment,emitEditComment}=props;
  const user=useUser();
  const decodedJwt=jwtDecode(user.jwt);
  dayjs.extend(relativeTime);
  const [commentRelativeTime,setCommentRelativeTime]=useState("");
  const updateRelativeTime=()=>
  {
      if(createdDate){
       setCommentRelativeTime(dayjs(createdDate).fromNow());
     }
  }
  useEffect(()=>{updateRelativeTime()},[createdDate])
 //setInterval(()=>{updateRelativeTime()},1000*61);
 
return(
 <>
     <div className="comment-bubble">
    
               <div className="d-flex gap-5" style={{fontWeight:"bold"}}>
                 <div>
                  {createdBy.name}:
                  </div>
                  {
                  decodedJwt.sub===createdBy.username ?
                  <>
                     <div onClick={(e)=>{emitEditComment(id)}}
                     style={{cursor:"pointer",color:"blue"}}>
                        edit
                      </div>
                       <div onClick={(e)=>{emitDeleteComment(id)}} 
                       style={{cursor:"pointer",color:"red"}}>
                        delete
                      </div>
                  </>
                  :
                  <>
                  </>
                   }
               </div>
                  <div>
                  {text} 
                  </div>
        </div>
         <div style={{marginTop:"-1.25em",marginLeft:"1.4em",fontSize:"12px"}}>
              Postd {commentRelativeTime} 
               </div>
        </>
          )
}
export default Comment;
