import React ,{useContext, useEffect}from 'react';
import {Context} from "../../context";
import '../../css/task.css';
import moment from 'moment';
import {Link} from  'react-router-dom';
import axios from 'axios';

export default function Task(props) {
    const [user, setUser] = useContext(Context);
    const  getMe = async ()=>{
        const token = localStorage.getItem('jwtToken');
         
        const res = await axios.get(
            `/users/me`,
            {
                headers:{  "Authorization" :`Bearer ${token}` },
             
              }
            )
        try {
           
        
          setUser(user=>({...user,userInfo:res.data}))
      
        } catch (error) {
            console.error(error);
        }
    }
   useEffect(()=>{
       getMe();
   })
    return (
        <div  className="task border d-flex flex-column  mt-3 shadow ">
             
            
            <div className="note">
                <i className="pin"></i>
              
               <blockquote className="note yellow">
                  {props.task.description} 
                  <cite className="author">{user.userInfo ?user.userInfo.name : "" }</cite> 
                </blockquote>
            </div>
            <div className="utlis d-flex flex-row justify-content-around"  >
                <div className="moment">
                <i>{moment(props.task.updatedAt).format("L")}</i>
                </div>
                <div className="action d-flex flex-row">
                    <form onSubmit={props.delete}>
                        <button type="submit"><i className="far fa-trash-alt"></i> </button>
                    </form>
                    
                    <Link to={`/tasks/${props.task._id}`}><i className="fas fa-pencil-alt"></i></Link>
                </div>
             
            </div>
            

        </div>
    )
}
