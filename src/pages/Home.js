import React from 'react'
import Button from '@mui/material/Button';
import { Navigate, Link } from "react-router-dom";


function Home() {
    return (
        <div className="main">
            <div className="banner pr">
                <img className="bannerImg" src="/images/school.jpg" alt="" />
                <div className="bannertxt">
                    <h1 className="t_white">Welcome to Sigmen Schools</h1>
                    <Link className="td_none" to="/Admission">
                        <Button variant="outlined" color="info">Apply Now</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home