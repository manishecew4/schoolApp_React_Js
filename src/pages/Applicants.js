import React, {  } from 'react'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Searchbar from '../components/Searchbar'
import UserList from '../components/UserList'



function Applicants() {


    return (
        <div className="main">
            <div className="d-flex jcc aic  py-1 customContainer">
                <h2>Applicants</h2>
            </div>
            <div className="d-flex jcsb aic  py-1 customContainer">
                <div></div>
                <Searchbar />
                <Link className="td_none" to="/Admission">
                    <Button variant="outlined" color="info">Add User</Button>
                </Link>
            </div>

            <UserList />
            
        </div>
    )
}

export default Applicants