"use client"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import '../assets/registro.css';

export default function Register() {
    const [open, setOpen] = useState(false);
    const [registerStatus, setRegisterStatus] = useState('');
    const [values, setValues] = useState({
        user: '',
        password: '',
        showPassword: false,
    });

    const handleRegister = () => {
        Axios.post("http://localhost:3000/register", {
            usernamereg: values.user,
            userpasswordreg: values.password,
        }).then((Response) => {
            if (Response.data.err) {
                setOpen(true);
                setRegisterStatus('Something went wrong, please try again.');
            } else {
                setOpen(true);
                setRegisterStatus("Successfully registered, go to login page.");
            }
        });
    };

    const handleChangePassword = (event) => {
        setValues({ ...values, password: event.target.value });
    };

    const handleChangeUser = (event) => {
        setValues({ ...values, user: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const linkStyle = {
        marginLeft: "5px",
    };

    return (
        <div className='login-container'>
            <div style={{ width: '24%' }}>
                {open && (
                    <div>
                        <div>{registerStatus}</div>
                        <button onClick={() => setOpen(false)}>salir</button>
                    </div>
                )}
            </div>

            <div className="loginform">
                <div style={{ minWidth: '275px' }}>
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>registro</div>
                        <div>usuario</div>
                        <input
                            type="text"
                            value={values.user}
                            onChange={handleChangeUser}
                            style={{ width: '100%', marginBottom: '5px' }}
                        />
                        <div>contrasena</div>
                        <input
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChangePassword}
                            style={{ width: '100%', marginBottom: '5px' }}
                        />
                        <button onClick={handleRegister} style={{ width: '100%' }}>registro</button>
                    </div>
                </div>

                <div style={{ color: 'white', textAlign: 'center', marginTop: '4px' }}>
                no tienes cuenta? <Link to="/login" style={linkStyle}>Login</Link>
                </div>
            </div>
        </div>
    )
}
