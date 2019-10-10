import React,{useContext,useState} from 'react';
import {withRouter } from 'react-router-dom';
import {Context} from '../../context';
import {useSignUpForm} from '../../hooks/myCustomHooks';
import axios from 'axios';
import '../../css/Modal.css';
import {useMediaQuery}from 'react-responsive';

 function Modal(props) {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 786px)'
      })
   
    const isTabletOrMobileDevice = useMediaQuery({
      query: '(max-width: 786px)'
    })
   
    const initialsate ={
       
        completed:false
    }
    const [task,setTask] = useState(initialsate);
    const [user, setUser]  = useContext(Context);

    const AddTask  = async(e)=>{
        
       

          try {
            const token = localStorage.getItem('jwtToken');
            const res = await axios.post(`/tasks`,{
                description:inputs.description,
                completed:task.completed
            },{  headers:{
                "X-header" :`Bearer ${token}`
          }
            });
            setUser(user=>({...user,show:false,active:task.completed}));
          
            props.click(task.completed);
          
           
           
            
          } catch (error) {
              console.error(error)
          }
          }
  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(AddTask,[]);
  const  handelCheckBox = (event)=>{
     event.persist();
      setTask(task=>({
          ...task,
          completed:event.target.checked
      }))
  }



    const dismissModal = ()=>{
        setUser(user=>({...user,show:false}))
    }
    const desktopStyled ={
        zIndex:props.show?1:0,
        opacity:props.show ?1:0,
        position:"absolute",
        top:"25%",
        left:"30%",
        width:"600px",
     
        transition:"all 0.7s ease-in-out",
}
const mobileOrTabletteStyled = {
    zIndex:props.show?1:0,
    opacity:props.show ?1:0,
    position:"absolute",
    top:"25%",
    left:"-15%",
    width:"500px",
    
    transition:"all 0.7s ease-in-out",
}
    return (
        <div>
                {isDesktopOrLaptop && <div  id="Add" style={
               desktopStyled
            }>
        <div className='task-add shadow'>
            
           <form onSubmit={handleSubmit} >
               <h5 className='mt-5'>Add new task</h5>
           <div class="form-group">
               <label forhtml="exampleFormControlTextarea2">descreption</label>
               <textarea onChange={handleInputChange} value={inputs.description} name="description"className="form-control rounded-0" id="exampleFormControlTextarea2" rows="5" ></textarea>
           </div>
           <div class="form-check">
               <input 
                name="completed "
                lass="form-check-input"
                type="checkbox"  id="defaultCheck1" 
                checked={ task.completed  }
                onChange={handelCheckBox}
            
               />
               <label className="form-check-label" forhtml="defaultCheck1">
                   completed
               </label>
           </div>
           <input className='update' type="submit" value=" Add"/>
           <i onClick={dismissModal} style={{cursor:"pointer"}} className='finish ml-2 ' to='/tasks'>not yet</i>
             
          </form>
       </div>
       </div> 
                }
 
    {
        isTabletOrMobileDevice &&  <div  id="Add" style={mobileOrTabletteStyled}>
        <div className='task-add shadow'>
            
           <form onSubmit={handleSubmit} >
               <h5 className='mt-5'>Add new task</h5>
           <div className="form-group">
               <label forhtml="exampleFormControlTextarea2">descreption</label>
               <textarea onChange={handleInputChange} value={inputs.description} name="description"className="form-control rounded-0" id="exampleFormControlTextarea2" rows="5" ></textarea>
           </div>
           <div className="form-check">
               <input 
                name="completed "
                lass="form-check-input"
                type="checkbox"  id="defaultCheck1" 
                checked={ task.completed  }
                onChange={handelCheckBox}
            
               />
               <label className="form-check-label" forhtml="defaultCheck1">
                   completed
               </label>
           </div>
           <input className='update' type="submit" value=" Add"/>
           <i onClick={dismissModal} style={{cursor:"pointer"}} className='finish ml-2 ' to='/tasks'>not yet</i>
             
          </form>
       </div>
       </div> 
        } 
        </div>
       
  
        
    )
}

export default withRouter(Modal);