import React from 'react';
import {useAuth,useBack} from '../../hooks/myCustomHooks';


export const withAuth =(ChildComponent)=>(props)=> {
     
     useAuth(props);
    return (<ChildComponent {...props}/> )
}


export const withBack = (ChildComponent)=>(props)=>{
    useBack(props)
    return (<ChildComponent {...props}/> )
}

