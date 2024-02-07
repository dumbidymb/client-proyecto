"use client"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

import "../assets/login.css"

const state = {
    isLoggedin: false,
};

let response;

export default function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [Loginstatus, setLoginstatus] = useState("");

    const [values, setValues] = useState({
        user: '',
        password: '',
        showPassword: false,
    });

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3000/login").then((result) => {
            if (result.data.logged === true) {
                response = result.data.user;
                state.isLoggedin = true;
                navigate("/profile");
            }

        })
    }, [])

    const handleLogin = () => {
        Axios.post("http://localhost:3000/login", {
            usernamelog: values.user,
            userpasswordlog: values.password,
        }).then((Response) => {
            response = Response.data.result;
            if (!Response.data.auth) {
                setLoginstatus(Response.data.message);
                setOpen(true);
            } else {
                state.isLoggedin = true;
                navigate("/profile");
                localStorage.setItem("token", Response.data.token);
            }
        });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const toggleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <div className='login-container'>
            <div style={{ width: '24%' }}>
                {open && (
                    <div>
                        <div>{Loginstatus}</div>
                        <button onClick={() => setOpen(false)}>Close</button>
                    </div>
                )}
            </div>

            <div className="loginform">
                <div style={{ minWidth: '275px' }}>
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>Login</div>
                        <div>usuario</div>
                        <input
                            type="text"
                            value={values.user}
                            onChange={handleChange('user')}
                            style={{ width: '100%', marginBottom: '5px' }}
                        />
                        <div>contrasena</div>
                        <input
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            style={{ width: '100%', marginBottom: '5px' }}
                        />
                        <button onClick={handleLogin} style={{ width: '100%' }}>Login</button>
                    </div>
                </div>

                <div style={{ color: 'white', textAlign: 'center', marginTop: '4px' }}>
                    no tienes cuenta?<Link to="/register">Registrate</Link>
                </div>
            </div>
        </div>
    )
}

export { state, response };
