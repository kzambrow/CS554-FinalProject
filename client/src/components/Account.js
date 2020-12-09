import React from 'react'
import SignOutButton from './SignOut'
import '../App.css'
import ChangePassword from './ChangePassword'
import ProfilePostings from './ProfilePosts'

function Account(){
    return(
    <div>  
         <h2>Account Page</h2>
         <ChangePassword/>
         <SignOutButton/>
         <ProfilePostings/>
    </div>
    )
        
    
}

export default Account; 