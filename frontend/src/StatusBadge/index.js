import {Badge} from 'react-bootstrap'
import {useState,useEffect} from 'react'
const StatusBadge=(props)=>{
const {text}=props;
//const [color,setColor]=useState('');
let color='';
color="info"
const variants={"Completed":"success","Needs Update":"danger","Pending Submission":"warning","Resubmitted":"primary"}
if(variants[text]) color=variants[text];
return(
      <Badge  pill
        bg={color}
        style={{fontSize:"1em"}}
      >
       {text}
      </Badge>
);
}
export default StatusBadge;
