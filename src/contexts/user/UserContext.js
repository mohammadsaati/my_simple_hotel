import React , { createContext , useState } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [isLogedIn , setIsLogedIn] = useState(false);
    const firebaseToken = 'AIzaSyC0LHaLj831Uw0HK0BovpZ30Riir9m2ygg';

    const cheeckLogedIn = () => {
        const token = Cookies.get('token');
        if (token) {
            setIsLogedIn(true);
        }
    }

    const signUp = async (userEmail , userPassword) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseToken}`;
        const data = {
            email : userEmail , 
            password : userPassword ,
            returnSecuretToken : true
        }

        try {

            const response =  await axios.post(url, data);
            Cookies.set('token' , response.data.idToken);
            setIsLogedIn(true);   

        } catch(error) {
            console.log(error)
        }
    }

    const signIn = async (userEmail , userPassword) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseToken}`;
        const data = {
            email : userEmail , 
            password : userPassword ,
            returnSecuretToken : true
        }

        try {

           const response = await  axios.post(url , data);
           console.log(response.data);
           Cookies.set('token' , response.data.idToken , { expires : 7});
           setIsLogedIn(true);  

        } catch (error) {
            console.log(error);
        }
    }

    const singOut = () => {
        Cookies.remove('token');
    }

    return (
        <UserContext.Provider
            value={{
                state : {
                    'cheeckLogedIn' : cheeckLogedIn ,
                    'isLogedIn' : isLogedIn ,
                    'signUp' : signUp ,
                    'singOut' : singOut , 
                    'signIn' : signIn
                }
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
