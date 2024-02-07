import React, { useState } from 'react';
import { Avatar, Button, Box, Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';
import { response } from './Login';
import '.';

export default function Profile() {
    const [jwtstatus, setjwtstatus] = useState("");
    const [open, setopen] = useState(false);
    const [severity, setseverity] = useState("success");
    const navigate = useNavigate();
    const userName = response;

    const userauthenticated = () => {
        Axios.get("http://localhost:88/userauth",{
            headers:{
                "x-access-token": localStorage.getItem("token")
            }}).then((result) => {
                setopen(true)
                setjwtstatus(result.data.message)
                if(!result.data.auth){
                  setseverity("warning")
                }else{
                  setseverity("success")
                }
            })
    }
    
    const logout = () => {
        Axios.get("http://localhost:88/logout").then((result)=> {
            navigate('/login');
        });
    }

    return (
        <div className='profile-container'>
            <Box style={{ width: '24%' }}>
                <Collapse in={open}>
                    <Alert
                        severity={severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setopen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {jwtstatus}
                    </Alert>
                </Collapse>
            </Box>

            <Avatar style={{ backgroundColor: deepOrange[500], width: 56, height: 56, fontSize: 25 }}>
                {userName[0].toUpperCase()}
            </Avatar>
            <h1 className='profile-heading'>Hello {userName}</h1>
            <Button variant="outlined" onClick={logout}>
                Logout
            </Button>
            <Button variant="outlined" style={{ marginTop: '4px' }} onClick={userauthenticated}>
                verify
            </Button>
        </div>
    );
}