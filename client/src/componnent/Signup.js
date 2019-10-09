import React,{useContext ,useEffect,useState} from 'react';
import axios from 'axios';
import { Context } from '../context';
import {useSignUpForm} from '../hooks/myCustomHooks';
import styles from '../css/signupLogin.module.css';
import {withBack} from './HOC/isAuth';



 const  Signup=(props)=> {
     const [errors,setErrors] = useState();
    const [,setUser]  = useContext(Context)
  
    useEffect(()=>{
        document.body.className = styles.bodySignupLogin;
        return function cleanUp(){
            document.body.className = NaN;
            
        }
    })
    const signup =async () => {
      
    
      
        try {
            const res = await axios.post('/users',inputs);
            setUser((user)=>({...user,authToken:res.data.token}));
           
            localStorage.setItem('jwtToken',res.data.token);
         
            props.history.push('/tasks');
         
            
        } catch (error) {
              
                setErrors(error.response.data.errors)
               
              
              
         
           
        }
      }
      console.log(errors)

    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(signup,[]);
   
     console.log(errors)
    return (
       
        <div className='container mt-5'>
    
            <div className="row">
                <div className='col-12  col-md-4'>
                    <form className={styles.signupLoginForm} onSubmit={ handleSubmit}>
                        <i className={`shadow ${styles.Pin}`}></i>
                        <h5>signup</h5>
                    <div className="form-group">
                        <label forhtml="formGroupExampleInput"> Name</label>
                        <input   type="text" name="name" onChange={handleInputChange} value={inputs.Name}  className="form-control" id="formGroupExampleInput" placeholder="Example input"/>
                        {errors && errors.name?<i className={styles.Errors}>{errors.name.message}</i>: ""}
                    </div>
                    <div className="form-group">
                        <label forhtml="formGroupExampleInput2">email</label>
                        <input type='text' name="email" onChange={handleInputChange} value={inputs.email} className="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                        {errors && errors.email?<i className={styles.Errors}>{errors.email.message}</i>: ""}
                    </div>
                    <div className="form-group">
                        <label forhtml="formGroupExampleInput2">email</label>
                        <input type='password' name="password" onChange={handleInputChange}  value={inputs.password} className="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                        {errors && errors.password?<i className={styles.Errors}> {errors.password.message}</i>: ""}
                    </div>
                    <div>
                            <input type='submit' className={styles.LoginSignupButton} value="signup"/>
                     </div>
                  
                      
                </form>
                </div>
                <div className="col-12 col-md-4">
                    
                </div>
                <div className="col-12 col-md-4 ">
                    
                </div>


            </div>

        </div>
      
    )
}
export default withBack( Signup);
