import React ,{useContext, useEffect,useState} from 'react';
import {useSignUpForm} from '../hooks/myCustomHooks';
import { Context } from '../context';
import axios from 'axios';
import {withBack} from '../componnent/HOC/isAuth';
import styles from '../css/signupLogin.module.css';

function Login(props) {
    const [errors,setErrors] = useState();
    const [user,setUser]  = useContext(Context)
    useEffect(()=>{
        document.body.className = styles.bodySignupLogin;
        return function cleanUp(){
            document.body.className = NaN;
            
        }
    },[])
    
    const login =async () => {
    
      
        try {
            const res = await axios.post('/users/login',inputs);
            setUser((user)=>({...user,authToken:res.data.token}));
            localStorage.setItem('jwtToken',res.data.token);
             props.history.push('/tasks');
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data)
      
        }
      }
      
    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(login,[]);
   
    return (
        <div className='container mt-5 '>
        <div className="row">
            <div className='col-12  col-md-4'>
                <form className={styles.signupLoginForm} onSubmit={ handleSubmit}>
                <i className={`shadow ${styles.Pin}`}></i>
                <h5 className="pb-5">login</h5>
                <div className="form-group">
                    <label forhtml="formGroupExampleInput2">email</label>
                    <input type='email' name="email" onChange={handleInputChange} value={inputs.email} className="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                </div>
                <div className="form-group">
                    <label forhtml="formGroupExampleInput2">email</label>
                    <input type='password' name="password" onChange={handleInputChange}  value={inputs.password} className="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                </div>
                <div>
                        <input type='submit' className={styles.LoginSignupButton} value="login"/>
                 </div>
                 {errors && errors.msg?<i className={styles.Errors}>{errors.msg}</i>: ""}
            </form>
            </div>
            <div className="col-12  col-md-4">
                
            </div>
            <div className="col-12 col-md-4">
                
            </div>


        </div>

    </div>
    )
}

export default withBack(Login);
