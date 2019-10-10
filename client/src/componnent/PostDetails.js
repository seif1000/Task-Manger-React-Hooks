import React,{useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {withAuth} from './HOC/isAuth';
import Spinner  from "./spinner/spinner";
import '../css/postDeatils.css'
import {useSignUpForm} from '../hooks/myCustomHooks';
import {Link} from 'react-router-dom';
import {Context} from '../context';





 function PostDetails(props) {
    const [user, setUser] = useContext(Context);

     const initialsate ={
         taskItem:null,
         completed:false,
         updated:false
     }
     const [task,setTask] = useState(initialsate);
     const getAvatar =async ()=>{
       
          try {
            const token = localStorage.getItem('jwtToken');
         
            const res = await axios.get(
                `/users/avatar`,
                {
                    headers:{  "Authorization" :`Bearer ${token}` },
                    responseType:'arraybuffer'
                 
                  }
                )
         
         
            const image =   new Buffer(res.data, 'binary').toString('base64');
          
            setUser(user=>({...user,avatar:image}))
        
          } catch (error) {
              console.error(error);
          }
    }
     const {id}  =props.match.params;
     const fetchPost =async ()=>{
      

       try {
        const token = localStorage.getItem('jwtToken');
        const res = await axios.get(`/tasks/${id}`,{
         headers:{
             "Authorization" :`Bearer ${token}`
         }
     });
           setTask(task=>(
               {
                   ...task,
                   taskItem:res.data,
                   completed:res.data.completed

                }
                   ))
       } catch (error) {
           console.error(error);
       }
     }
     const editTask = async()=>{
     

             try {
                const token = localStorage.getItem('jwtToken');
                const res = await axios.patch(`/tasks/${id}`,{
                    description:inputs.description,
                    completed:task.completed
                },{  headers:{
                  "Authorization" :`Bearer ${token}`
              }
                });
                setTask(task=>(
                    {
                        ...task,
                        taskItem:res.data,
                        completed:res.data.completed,
                        updated:true
     
                     }))
                     setUser(user=>({...user,active:false}))
                     setTimeout(() => {
                         setTask(task=>({...task,updated:false}))
                     }, 2000);
                   
             } catch (error) {
                 console.error(error)
             }
             }
     const {inputs, handleInputChange, handleSubmit} = useSignUpForm(editTask,[]);
     const  handelCheckBox = (event)=>{
        event.persist();
         setTask(task=>({
             ...task,
             completed:event.target.checked
         }))
     }
     useEffect(()=>{
        setUser(user=>({...user,active:false}))
         fetchPost();
         getAvatar();
     },[])
   

     if(!task.taskItem) return <Spinner/>
    return (
        <div>
            <div  className="alert alert-success updated mt-3" style={{display:task.updated?'block':'none'}}>
                task updated successfully
            </div>
            <div className='task-update shadow'>
                    <i className='shadow pin'></i>
                    <form onSubmit={handleSubmit}>
                        <h5>update your task</h5>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea2">descreption</label>
                        <textarea name="description"onChange={handleInputChange} class="form-control rounded-0" id="exampleFormControlTextarea2" rows="5" value={inputs.description}>{task.taskItem.description}</textarea>
                    </div>
                    <div class="form-check">
                        <input  name="completed "lass="form-check-input" type="checkbox"  id="defaultCheck1" 
                        checked={ task.completed  }
                        onChange={handelCheckBox}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                            completed
                        </label>
                    </div>
                    <input className='update' type="submit" value="update"/>
                    <Link className='finish ml-2' to='/tasks'>Back</Link>
                    
                </form>
                <div>
        
            
            </div>
                </div>
        </div>
       
    )
}

export default withAuth(PostDetails);
