// form user for Login and Register 

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css" 
import LoadingIndicator from "./LoadingIndicator";



// Form function for Login and Register
function Form({route, method}) {   // route 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoaging] = useState(false)
    const navigate = useNavigate()
    const name = method === "login" ? "Login" : "Register"

    // method to submit login or register form 
    const handleSubmit = async (e) => {
        setLoaging(true);   // turn on loading until submission result found
        e.preventDefault();    // prevent from submitting the default and reloading page
        
        try {
            const res = await api.post(route, {username, password})    // based on route of post request (login/register), perform actions having input values username & password
            if(method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)    // store ACCESS_TOKEN in localStorage
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)  // store REFRESH_TOKEN in localStorage
                navigate("/")        // navigate home after login
            } else {
                navigate("/login")   // navigate login after registration
            }
        } catch(error) {
            alert(error)
        } finally {
            setLoaging(false)    // turn off loading
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>  
            <label>Username</label>
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/> 
            <label>Password</label>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
            {/* conditional rendering to show loading */}
            { loading && <LoadingIndicator/>}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form