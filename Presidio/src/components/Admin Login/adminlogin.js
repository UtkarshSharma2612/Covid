import React, {useState, usestate} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { FormControlUnstyledContext } from "@mui/base";


function adminLogin() {

    const [email,setEmail]=useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();
    
    async function adminLogin(event) {
        event.preventDefault()
        const response = await axios.post ("http://localhost:1337/api/adminlogin", {
            email,
            password, 
    });
    
        const data =response.data;
        console.log(response)
        if(response.data.status === "ok")
        {
            navigate("/manage")
        }
        else
            alert("Wrong credentials")
    }

    return (
        <div className="adminLogin">  
        <h1>Admin Login</h1>
            <form onSubmit={adminLogin}> 
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <br/>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                />
                <br/>
                <input type="submit" value ="register"/>
            </form>
        </div>
    );
    
}

export default adminLogin;