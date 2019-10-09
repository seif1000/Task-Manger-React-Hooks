import React,{useContext , useEffect,useState}  from 'react';
import styles from '../css/navbar.module.css';
import {Context} from '../context';

 function Navbar(props) {

   const [user, setUser] = useContext(Context);
 
  const  logoutHnadler = ()=>{
      
       localStorage.removeItem('jwtToken');

       return props.history.push('/');
   }
    const showModalUp = ()=>{
        setUser(user=>({...user,show:true}))
       
    }
  
   useEffect(()=>{
       
       setUser((user)=>({
           ...user,
           authToken:localStorage.getItem('jwtToken'),
         
        
        }
        ))
      
   },[])
   // add task button should appears only in the home page in the navbar

   const id = window.location.href;
   var afterSlashChars = id.match(/\/([^\/]+)\/?$/)[1]
    
   //login navbar className
    const className = `navbar navbar-expand-lg navbar-light p-3 ${styles.loginedNavbar}`
    
    if(!user.authToken){
        return (
            <nav className="navbar navbar-expand-lg navbar-light ">
            <a   className={`navbar-brand ${styles.BrandLogo}`} href="/">Task-Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span   className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    
                    <a className="nav-item nav-link " href="/">signup <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="/login">login</a>


                    
                </div>
            </div>
      </nav>
           )   
    }
   
    return(
           
        <nav className={className}  >
        <a   className={`navbar-brand ${styles.BrandLogo}`} href="/">Task-Manager</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span   className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
                
         { afterSlashChars ==='tasks'? <i onClick={showModalUp}  className={`fas fa-plus p-2 ${styles.Add}`}></i> : <i></i>}
              <a className="nav-item nav-link px-2" href="/tasks">tasks</a>
               <form onSubmit={logoutHnadler} className="px-2">
                  <input type="submit" className={styles.LogoutButton} value="logout" />
               </form>
               <a  href="/users/me" className={` ml-2 mt-1  ${styles.user}`}>
            
                  <img className={styles.Image} src={user.avatar? `data:image/jpeg;base64,${user.avatar}`:`https://www.nicepng.com/png/detail/780-7805650_generic-user-image-male-man-cartoon-no-eyes.png`}/>
              
             
               </a>
             
              
            </div>
        </div>
       </nav>
       
    )
}

export default Navbar;