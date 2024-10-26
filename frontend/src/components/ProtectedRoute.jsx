import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";



function ProtectedRoute({children}) {
    // check if authorized before using route
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // refresh access token function
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)    // fetch refresh token

        try{
            // send request to backend to get a new access token using the refresh token
            const res = await api.post("/api/token/refresh/", 
                                       {refresh: refreshToken})
            if(res.status === 200) {   // check if backend server sesponse if 200 
                localStorage.setItem(ACCESS_TOKEN, res.data.access)    // overwrite the new access token 
                setIsAuthorized(true)   // grant authorization
            } else {
                setIsAuthorized(false)  // deny authorization
            }

        } catch(error) {    // if refresh token not valid, print error to console and deny authorization
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // check if access token needs to be refreshed or still valid
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)       // fetch access token
        
        // if token is null, user not authorized
        if(!token) {
            setIsAuthorized(false)
            return 
        } else {     // token existent. Check it's time validity
            const decoded = jwtDecode(token)
            const tokenExpiration = decoded.exp 
            const now = Date.now() / 1000   // get date in seconds instead of milliseconds
            
            if(tokenExpiration < now) {    // token not valid anymore regarding time
                await refreshToken()    // refresh the access token based on the refresh token
            } else {                       // token still valid anymore regarding time
                setIsAuthorized(true)
            }
        }
    }

    // until state is null, loading and checking for token validity
    if(isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}


export default ProtectedRoute