import React,{useState,useEffect,useContext} from 'react';
import {Context} from '../context';
import axios from 'axios';
import {withAuth} from './HOC/isAuth';
import Spinner from './spinner/spinner';
import Modal from './layout/Modal';
import Task from './layout/Task';
import  '../css/home.css';


 const Home = (props) => {
   
    const [user, setUser] = useContext(Context);
   
    

    const getAvatar =async ()=>{
     
          try {
            const token = localStorage.getItem('jwtToken');
         
            const res = await axios.get(
                `/users/avatar`,
                {
                    headers:{  "X-header" :`Bearer ${token}` },
                    responseType:'arraybuffer'
                    //responseType: 'arraybuffer'
                  }
                )
            const image =   new Buffer(res.data, 'binary').toString('base64');
            setUser(user=>({...user,avatar:image}))
        
          } catch (error) {
              console.error(error);
          }
    }
     
      const onDeleteTask = async(id)=>{
       

                try {
                    const token = localStorage.getItem('jwtToken');
                    const res = await axios.delete(`/tasks/${id}`,{
                         headers:{
                            "X-header" :`Bearer ${token}`
                         }
                         })
         
                    setUser(user=>({
                        ...user,
                        taskItems:user.taskItems.filter(item=>item._id === id)
                    }));
                } catch (error) {
                     console.error(error);
                }
            
      }   
      
     
    const fetchTasks =async (query,skip)=>{
       // const skip = 6 * (user.pageNo-1);
     
        try {
            const token = localStorage.getItem('jwtToken');
            const res = await axios.get(`/tasks?completed=${query}&limit=6&skip=${skip}`,{
            headers:{
                "X-header" :`Bearer ${token}`
            }
            });
               setUser(user=>({...user,taskItems:res.data}));
              
               
        } catch (error) {
            console.error(error)
        }
        }
        const increasePage = ()=>{
            setUser((user=>({
                ...user,
                pageNo:user.pageNo + 1,
              
            })));
            fetchTasks(user.active, 6 *(user.pageNo + 1))
            console.log(user.taskItems)
           
        }  
        const decreasePage = ()=>{
            if(user.pageNo>0){
                setUser((user=>({...user,pageNo:user.pageNo - 1})));
            }
            fetchTasks(user.active, 6 * (user.pageNo - 1))
         
           
        }  
       
    useEffect( () => {
         
        fetchTasks(false);
        getAvatar();
      
       
    },[])
  
    
 
    
    return (
        
      <div>
          <Modal show={user.show} click={query=>{fetchTasks(query)}} />
            <div className='row corp' style={{
                
                opacity:user.show?0.2:1
            }}>
            
            <div className='col-12 col-md-2 mother_tab border-right   '>
                <div
                 onClick={(e)=>{
                    fetchTasks(false);
                    setUser((user=>({...user,pageNo:0,active:false})));
                    e.target.classList.add('active');
                    e.target.nextSibling.classList.remove('active');
                     }} 
                     className={user.active?`son_tab mt-5 ml-1 p-2 `:` active son_tab mt-5 ml-1 p-2 `}>
                     tasks
                </div>
                <div
                
                 onClick={(e)=>{ 
                     fetchTasks(true)
                     setUser((user=>({...user,pageNo:0,active:true})));
                     e.target.classList.add('active');
                     e.target.previousSibling.classList.remove('active');
                     } }
                  className={user.active?`active son_tab mt-3 ml-1 p-2 `:` son_tab mt-3 ml-1 p-2 `}>
                completed Tasks 
                </div>
              
            </div>
            <div className="col-12 col-md-10">
                <div className=' d-flex flex-wrap flex-row justify-content-around'>
                
                { user.taskItems.map(task=> <Task delete ={()=>{
                    onDeleteTask(task._id)
                    }} key={task._id} task={task}/>)}
                
                
                </div>
                <div className="Pager mt-5">
                    <button  onClick={decreasePage} disabled={user.pageNo=== 0?true:false}>prev</button>
                    <i>- {user.pageNo + 1} -</i>
                    <button onClick={increasePage} disabled={user.taskItems <6  ?true:false}>next</button>
                </div>
            </div>
            
           
           </div>
      </div>   
   
    )
}

export default withAuth(Home);