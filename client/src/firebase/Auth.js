import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';
const axios = require('axios');


export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                axios.post('http://localhost:5000/user/addUser', {
                    email: user.email,
                    displayName: user.displayName,
                    islandName: user.islandName,
                    inGameName: user.inGameName
                }).then((res) => {
                    // user.id = res.data.data._id;
                    // console.log(res)
                    setCurrentUser(user);
                    setLoadingUser(false);
                });
            } else{
                setCurrentUser(user);
                setLoadingUser(false);
            }
        });
    }, []);

    // if (currentUser && addUserIdTag) {
    //     console.log(addUserIdTag);
    //     setAddUserIdTag(false);
    //     axios.post('http://localhost:5000/user/addUser', {
    //         email: currentUser.email,
    //         displayName: currentUser.displayName
    //     }).then((res) => {
    //         console.log(res);
    //         const id = res.data;
    //         let temp = currentUser;
    //         temp.userId = id;
    //         setCurrentUser(temp);
    //     });


    // }

    if (loadingUser) {
        return <div>Loading....</div>;
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};