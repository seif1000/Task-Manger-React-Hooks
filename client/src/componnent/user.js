import React,{useEffect,useContext,useState} from  'react';
import axios from 'axios';
import {Context} from '../context';
import {withAuth} from './HOC/isAuth';
import styles  from '../css/user.module.css';
import {useSignUpForm} from '../hooks/myCustomHooks';
import FormData from 'form-data';


 function User(props) {
   const  initilaState = {
         modif:false,
         image:null,
         errors:{},
         deleted:false
     }
     const [modifier,setModifier] = useState(initilaState);
    const [user, setUser] = useContext(Context);
    const getAvatar =async ()=>{
        const token = localStorage.getItem('jwtToken');
         
          const res = await axios.get(
              `http://localhost:5000/users/avatar`,
              {
                  headers:{  "Authorization" :`Bearer ${token}` },
                  responseType:'arraybuffer'
               
                }
              )
          try {
         
            const image =   new Buffer(res.data, 'binary').toString('base64');
          
            setUser(user=>({...user,avatar:image}))
        
          } catch (error) {
              console.error(error);
          }
    }
    const onChangeHandler =(e)=>{
         e.persist();
        let file = e.target.files[0];
     
         
          setModifier(modifier=>({...modifier,image:file}));
     
     
              
    }
    const addAvatar = async(e)=>{
      e.preventDefault();

        try {
          const token = localStorage.getItem('jwtToken');
          const file = modifier.image;
          var data = new FormData()
          data.append('avatar',file)
          const res = await  axios.post('http://localhost:5000/users/me/avatar', data,
                {
                   headers: {"Authorization" :`Bearer ${token}`},
                   responseType:'arraybuffer'
   
               });
          
          const image =   new Buffer(res.data,'binary').toString('base64');
          setUser(user=>({...user,avatar:image}));
        } catch (error) {
         
           if(error.response.status === 400){
              setModifier(modifier=>({...modifier,errors:{message:'please update an image with size lower than 10Mo'}}))
           }
          
           
        }
        
    }
    const  getMe = async ()=>{
        const token = localStorage.getItem('jwtToken');
         
        const res = await axios.get(
            `http://localhost:5000/users/me`,
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
   const  modifieInput = ()=>{
         const {modif} = modifier;
        setModifier(modifier=>({...modifier,modif:!modif}))
    }
    const updateMe  =async()=>{
        const token = localStorage.getItem('jwtToken');
         
    
        try {
          const res = await axios.patch(
            `http://localhost:5000/users/me`,inputs,
            {
                headers:{  "Authorization" :`Bearer ${token}` },
             
              }
            )
        
          setUser(user=>({...user,userInfo:res.data}));
          setModifier(modifier=>({...modifier,modif:false}))
         
      
        } catch (error) {
              setModifier(modifier=>({...modifier,errors:error.response.data.errors}))
           
         
        }
    }
     const removeMe =async  ()=>{
      const token = localStorage.getItem('jwtToken');
       try {
        const res = await  axios.delete('http://localhost:5000/users/me', {
          headers:{  "Authorization" :`Bearer ${token}` },
       
        });
        localStorage.removeItem('jwtToken');
         setModifier(modifier=>({...modifier,deleted:true}))

         setTimeout(() => {
          setModifier(modifier=>({...modifier,deleted:false}))
         }, 3000);
       } catch (error) {
           console.error(error);
       }
     
     }
    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(updateMe,[]);
    useEffect (()=>{
        getAvatar();
        getMe();
    },[])
   
     if(!user.userInfo) return <p>...loading</p>
    return (

        <div className="container  mt-5">
            <div className="row">
              <div className=" col-12 col-md-4 py-4 border-right">
                  <div className={`mb-5 ${styles.Avatar}`}>
                    
                    <img className={styles.Img} src={user.avatar? `data:image/jpeg;base64,${user.avatar}`:`https://www.nicepng.com/png/detail/780-7805650_generic-user-image-male-man-cartoon-no-eyes.png`}/>
                    {modifier.errors && modifier.errors.message ?<p className={styles.Errors}>{modifier.errors.message }</p> : ""}
                    
                  </div>
                  <form onSubmit={addAvatar} >
                        <input onChange={onChangeHandler} type="file" name="avatar"  className={styles.InputFile} />
                        <button type="submit" disabled={!modifier.image} className={styles.Save}>save</button>
                  </form>
                    
              </div>
              <div className="col-12 col-md-8">
                  <form onSubmit={handleSubmit}  >

                     
                    <div className={`${styles.Update} mb-4`}>
                      <label className={modifier.modif?styles.LabelUp:styles.Label}>{user.userInfo.name}</label>
                        <input
                         className={ modifier.modif?styles.Input:styles.Modifier}  
                         onChange={handleInputChange}
                          value={modifier.modif ?inputs.name: ''}
                          type="text" name="name" 
                          readOnly={!modifier.modif} />
                          <i 
                          onClick={modifieInput}
                          class={ modifier.modif?`fas fa-times ${styles.Pen}`:`fas fa-pencil-alt ${styles.Pen}`
                          }></i>
                    </div>
                    <div className={`${styles.Update} mb-4 `}>
                    <label  className={modifier.modif?styles.LabelUp:styles.Label}>{user.userInfo.email}</label>
                        <input 
                         className={modifier.modif?styles.Input:styles.Modifier}
                        onChange={handleInputChange}
                        value={modifier.modif ?inputs.email: ''}
                         type='email' name="email"
                         readOnly={!modifier.modif}
                          /> 
                            {modifier.errors && modifier.errors.email?<p className={styles.Errors}> {modifier.errors.email.message}</p>: ""} 
                       
                    </div>
                    <div  className={`${styles.Update} mb-4 `}>
                      <label  className={modifier.modif?styles.LabelUp:styles.Label}>{user.userInfo.age}</label>
                    <input  
                    className={modifier.modif?styles.Input:styles.Modifier}
                     onChange={handleInputChange} 
                     value={modifier.modif ?inputs.age: ''}
                     type='number' name="age"
                     readOnly={!modifier.modif}

                       /> 
                         {modifier.errors && modifier.errors.age?<p className={styles.Errors}> {modifier.errors.age.message}</p>: ""}
                    </div>
               
                    <div>
                            <input className={styles.Submit} type='submit'  value="update" disabled={!modifier.modif}/>
                     </div>
                </form>
                  <div className={styles.DangerZone}>
                        <button onClick={removeMe}>delete my account</button>
                        <div  className="alert alert-danger updated mt-3" style={{display:modifier.deleted?'block':'none'}}>
                        we are sad to see you go we hope to see you soon ,logout for the last time
                  </div>
                  </div> 
              </div>
            </div>
          
           
        </div>
    )
}
export default withAuth(User);