import React, {useState} from 'react'
import SignOutButton from './SignOut'
import '../App.css'
import ChangePassword from './ChangePassword'
import Landing from './Landing'; 

function Account(props){

    return(
    <div>
       <h2>Account Page</h2>
         <ChangePassword/>
         <SignOutButton/>
         <Landing 
         //pagenum = {props.match.params.pagenum} 
         isProfile= {true}/>

    </div> 
         
    )
        
    
}

export default Account; 