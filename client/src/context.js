import React,{useState} from 'react';

export const Context = React.createContext();

 const Provider = ({children}) =>{
    const initialState = {
       authToken :null,
       userInfo:null,
       show:false,
       avatar: "",
       pageNo:0,
       taskItems:[],
       active:false
    }

    const [user, setUser] = useState(initialState);

    return (
       <Context.Provider value={[user,setUser]}>{children}</Context.Provider>
    )
}

export default Provider;
