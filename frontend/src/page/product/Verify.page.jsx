import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "ldrs/lineSpinner";
import axios from "../../helpers/axios";

const VerifyPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const success = queryParams.get("success");

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const res = await axios.post("/api/order/verify", { orderId, success });

      if (res.data.success) {
        navigate(`/verify/success/${orderId}`, { replace: true });
      } else {
        navigate(`/verify/fail`, { replace: true });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate(`/verify/fail`, { replace: true });
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <l-line-spinner
        size="80"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  );
};

export default VerifyPage;
