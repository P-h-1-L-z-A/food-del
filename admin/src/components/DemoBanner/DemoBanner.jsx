import React, { useContext } from 'react'
import './DemoBanner.css'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const DemoBanner = () => {

    const { isAdmin } = useContext(AdminContext);
    const navigate = useNavigate();

    if (isAdmin) return null;

    return (
        <div className='demo-banner'>
            <div className="demo-banner-content">
                <span className="demo-banner-icon">👁</span>
                <span className="demo-banner-text">
                    <strong>Demo Mode</strong> — You're viewing the admin panel as a visitor. Destructive actions are disabled.
                </span>
                <button className="demo-banner-login-btn" onClick={() => navigate('/login')}>
                    Login as Admin
                </button>
            </div>
        </div>
    )
}

export default DemoBanner
