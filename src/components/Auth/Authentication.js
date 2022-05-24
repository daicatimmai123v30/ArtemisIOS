import React, {useState,useRef,useEffect,createContext, Children}from 'react';


export const authentication =createContext();
export default function Authentication({children}) {
    const [test,setTest] =useState(false);

    const change =()=>{
        setTest(!test);
    }

    const show=()=>{
        console.log(test);
    }

    const auth ={
        change,
        show
    }

    return (
        <authentication.Provider value={auth} >{children}</authentication.Provider>
    )
 }