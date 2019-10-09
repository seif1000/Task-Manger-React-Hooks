import {useState,useEffect} from 'react';

export const useSignUpForm = (callback,l) => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => (
        {
        ...inputs,
         [event.target.name]:  event.target.value
      }
      )
      );
    }
   
    
    return {
      handleSubmit,
      handleInputChange,
    
      inputs
    };
  }

export const useAuth = (props) => {

  useEffect(() => {
    function pushTo() {
      if(!localStorage.getItem('jwtToken')){
        props.history.push('/');
      }
        
    }
     pushTo();
  }, []);
  
};
export const useBack = (props)=>{
  useEffect(() => {
    function pushTo() {
      if(localStorage.getItem('jwtToken')){
        props.history.push('/tasks');
      }
        
    }
     pushTo();
  }, []);
  
}




