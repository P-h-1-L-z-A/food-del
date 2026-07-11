import React, { useContext, useEffect, useState } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading"); // "loading" | "success" | "failed"

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                // Clear frontend cart state after successful payment
                setCartItems({});
                setStatus("success");
                setTimeout(() => navigate("/myorders"), 2500);
            } else {
                setStatus("failed");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            setStatus("failed");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            {status === "loading" && (
                <div className="spinner"></div>
            )}
            {status === "success" && (
                <div className="verify-message verify-success">
                    <div className="verify-icon">✅</div>
                    <h2>Payment Successful!</h2>
                    <p>Your order has been placed. Redirecting to your orders...</p>
                </div>
            )}
            {status === "failed" && (
                <div className="verify-message verify-failed">
                    <div className="verify-icon">❌</div>
                    <h2>Payment Not Completed</h2>
                    <p>Your payment was cancelled or could not be processed.</p>
                    <p>Don't worry — your cart items are still saved.</p>
                    <div className="verify-actions">
                        <button onClick={() => navigate("/order")} className="verify-btn-primary">Try Again</button>
                        <button onClick={() => navigate("/cart")} className="verify-btn-secondary">Back to Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Verify;
