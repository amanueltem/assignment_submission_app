import Comment from "../Comment/index"
import {useState,useEffect} from "react"
import ajax from "../services/fetchService"
import {useUser} from "../UserProvider/index"
import {Button} from "react-bootstrap"

const CommentContainer=(props)=>{
const {assignmentId}=props;
const [assignment,setAssignment]=useState([]);
   const emptyComment={text:"",assignment:assignment};
  const [comment,setComment]=useState(
                                    {text:"",assignment:assignment
                                    });
 const [comments,setComments]=useState([]);
 useEffect(()=>
 {
    ajax(`/api/assignments/${assignmentId}`,"get",user.jwt,null).
              then((assignmentData)=>{
              setAssignment(assignmentData.assignment)
              }).
              catch((error)=>console.log(error));
 },[])
 const user=useUser();
 useEffect(()=>{
              ajax(`/api/comments?assignmentId=${assignmentId}`,"get",user.jwt,null).
              then((commentsData)=>{
              setComments(commentsData)
              }).
              catch((error)=>console.log(error));
           },[]);


      const handleDeleteComment=(commentId)=>{
       ajax(`/api/comments/${commentId}`,'delete',user.jwt,null);
       const commentsCopy=[...comments]
       const i=commentsCopy.findIndex(comment=>comment.id===commentId);
       commentsCopy.splice(i,1);
       setComments(commentsCopy);
       
      }
      
      const handleEditComment=(commentId)=>{
      
        const i= comments.findIndex(comment=>comment.id===commentId);
        setComment(comments[i]);
      }
     const submitComment=()=>{
     
        if(comment.id){
          ajax(`/api/comments/${comment.id}`,'put',user.jwt,comment).
          then((d)=>
          {
             const commentsCopy=[...comments]
             const i=commentsCopy.findIndex(comment=>comment.id===d.id)
             commentsCopy[i]=d;
           setComments(commentsCopy);
           setComment(emptyComment);
          });
        }
        else{
        ajax(`/api/comments`,'post',user.jwt,comment).
        then((d)=>{
           const commentsCopy=[...comments]
           commentsCopy.push(d)
           setComments(commentsCopy);
           setComment(emptyComment);
           });
           }
     }
     const updateComment=(value)=>{
        const commentCopy={...comment};
        commentCopy.text=value;
        commentCopy.assignment=assignment;
        setComment(commentCopy);
     }
return(
<>
   <div className="mt-5">
            <textarea style={{width:"100%", borderRadius:"0.25em"}} 
            value={comment.text}
            onChange={(e)=>{updateComment(e.target.value)}}>
            </textarea>
            <Button onClick={()=>submitComment()}>Post Comment</Button>
          </div>
    <div className="mt-5">
           {
             comments.map((comment)=>(
              <Comment
                      key={comment.id}
                      id={comment.id} 
                     createdDate={comment.createdDate}
                      createdBy={comment.createdBy}
                      text={comment.text}
                      emitDeleteComment={handleDeleteComment}
                      emitEditComment={handleEditComment}/>
             ))
           }
          </div>
          </>
)
}
export default CommentContainer;
