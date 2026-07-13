import React, { useContext, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = ({ url }) => {

    const { login } = useContext(AdminContext);
    const navigate = useNavigate();
    const [mode, setMode] = useState("login"); // "login" or "register"
    const [data, setData] = useState({ name: "", email: "", password: "", adminSecret: "" });
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (mode === "login") {
                const response = await axios.post(`${url}/api/user/admin-login`, {
                    email: data.email,
                    password: data.password
                });
                if (response.data.success) {
                    login(response.data.token);
                    toast.success("Logged in as Admin");
                    navigate('/list');
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(`${url}/api/user/admin-register`, {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    adminSecret: data.adminSecret
                });
                if (response.data.success) {
                    login(response.data.token);
                    toast.success("Admin account created & logged in!");
                    navigate('/list');
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
        setLoading(false);
    }

    const toggleMode = () => {
        setMode(prev => prev === "login" ? "register" : "login");
        setData({ name: "", email: "", password: "", adminSecret: "" });
    }

    return (
        <div className='admin-login'>
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-login-icon">
                        {mode === "login" ? (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        ) : (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                        )}
                    </div>
                    <h2>{mode === "login" ? "Admin Login" : "Register Admin"}</h2>
                    <p className="admin-login-subtitle">
                        {mode === "login"
                            ? "Enter your credentials to access the admin panel"
                            : "Create a new admin account with the secret key"
                        }
                    </p>
                </div>
                <form onSubmit={onSubmitHandler} className="admin-login-form">
                    {mode === "register" && (
                        <div className="admin-login-field">
                            <label htmlFor="admin-name">Full Name</label>
                            <input
                                id="admin-name"
                                name="name"
                                type="text"
                                placeholder="Your full name"
                                onChange={onChangeHandler}
                                value={data.name}
                                required
                            />
                        </div>
                    )}
                    <div className="admin-login-field">
                        <label htmlFor="admin-email">Email</label>
                        <input
                            id="admin-email"
                            name="email"
                            type="email"
                            placeholder="admin@example.com"
                            onChange={onChangeHandler}
                            value={data.email}
                            required
                        />
                    </div>
                    <div className="admin-login-field">
                        <label htmlFor="admin-password">Password</label>
                        <input
                            id="admin-password"
                            name="password"
                            type="password"
                            placeholder={mode === "register" ? "Min 8 characters" : "Enter your password"}
                            onChange={onChangeHandler}
                            value={data.password}
                            required
                        />
                    </div>
                    {mode === "register" && (
                        <div className="admin-login-field">
                            <label htmlFor="admin-secret">Admin Secret Key</label>
                            <div className="admin-secret-field-hint">Required to authorize admin registration</div>
                            <input
                                id="admin-secret"
                                name="adminSecret"
                                type="password"
                                placeholder="Enter the admin secret key"
                                onChange={onChangeHandler}
                                value={data.adminSecret}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? (
                            <span className="admin-login-spinner"></span>
                        ) : (
                            mode === "login" ? "Sign In" : "Create Admin Account"
                        )}
                    </button>
                </form>
                <div className="admin-login-toggle">
                    <span>{mode === "login" ? "Don't have an admin account?" : "Already have an account?"}</span>
                    <button className="admin-toggle-btn" onClick={toggleMode} type="button">
                        {mode === "login" ? "Register" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
