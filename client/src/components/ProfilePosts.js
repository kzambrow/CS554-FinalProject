import React, {useEffect, useContext} from 'react'; 
import {AuthContext} from '../firebase/Auth';
import {Redirect} from 'react-router-dom'; 
//import './App.css'; 

let li = null; 
let img = undefined; 

function ProfilePosts(){
    const{currentUser} = useContext(AuthContext); 
    //const[pageNum, setpageNum] = useState(undefined);

    if(currentUser){
    return <Redirect to="/home" />;
    }

    return(
        <div>
            
        </div>
    );

}

export default ProfilePosts; 